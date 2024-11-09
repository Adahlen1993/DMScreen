import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveCharacterProficiencyRequest,
  updateCharacterProficiencyRequest,
} from '../../src/redux/actions/characters/class/specific/proficiencies/index';

const ClassFeatureComponent = ({ feature, characterId, handleFeatureSelection = () => {} }) => {
  const {
    feature_name,
    description,
    choices,
    has_choices,
    number_of_options = 1,
    allow_duplicates,
    level,
    modifier,
    feature_label_id,
  } = feature;

  const [selectedValues, setSelectedValues] = useState([]); // Manage selected values locally
  const dispatch = useDispatch(); // Initialize Redux dispatch

  // Select proficiencies from the Redux store
  const { proficiencies, loading, error } = useSelector((state) => state.specificCharacter);

  // Parse choices if it is a JSON string
  let parsedChoices = [];
  if (typeof choices === 'string') {
    try {
      parsedChoices = JSON.parse(choices);
    } catch (error) {
      console.error('Error parsing choices:', error);
      parsedChoices = [];
    }
  } else if (Array.isArray(choices)) {
    parsedChoices = choices;
  }

  // Set selected values based on fetched proficiencies
  useEffect(() => {
    if (proficiencies.length > 0) {
      setSelectedValues(proficiencies.map((prof) => prof.name)); // Map to names if needed
    }
  }, [proficiencies]);

  const handleChange = (idx, value) => {
    console.log('Dropdown value changed:', value);
    console.log('Selected index:', idx);
  
    const updatedValues = [...selectedValues];
    updatedValues[idx] = value;
    setSelectedValues(updatedValues); // Update local state
    handleFeatureSelection(feature.id, updatedValues, idx); // Notify parent about changes
  
    const label = 'classfeaturetab';
    const featureLabelIdAsNumber = Number(feature_label_id);
  
    console.log('Feature label ID as number:', featureLabelIdAsNumber);
    console.log('Current proficiencies:', proficiencies);
  
    if (featureLabelIdAsNumber === 2) {
      if (proficiencies && proficiencies.length > 0) {
        console.log('Dispatching updateCharacterProficiencyRequest');
        dispatch(updateCharacterProficiencyRequest(characterId, updatedValues, label));
      } else {
        console.log('Dispatching saveCharacterProficiencyRequest');
        dispatch(saveCharacterProficiencyRequest(characterId, updatedValues, label));
      }
    } else if (featureLabelIdAsNumber === 1) {
      console.warn('Skills saga action not implemented yet');
    } else {
      console.warn(`No matching saga for feature label ID: ${featureLabelIdAsNumber}`);
    }
  };
  


  if (loading) {
    return <div>Loading proficiencies...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="feature-container">
      <h3>{feature_name} (Level {level})</h3>
      <p>{description}</p>
      {modifier && (
        <p>
          <strong>Modifier:</strong> {JSON.stringify(modifier)}
        </p>
      )}
      {has_choices && parsedChoices.length > 0 ? (
        Array.from({ length: number_of_options }).map((_, idx) => (
          <div key={idx} className="feature-choice">
            <label htmlFor={`${feature_name}-select-${idx}`}>Choose an option:</label>
            <select
              id={`${feature_name}-select-${idx}`}
              value={selectedValues[idx] !== undefined ? selectedValues[idx] : ''}
              onChange={(e) => handleChange(idx, e.target.value)}
            >
              <option value="">--Select an option--</option>
              {parsedChoices
                .filter(
                  (option) =>
                    allow_duplicates ||
                    !selectedValues.includes(option.value) ||
                    selectedValues[idx] === option.value
                )
                .map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
          </div>
        ))
      ) : (
        <p>No choices available for this feature.</p>
      )}
    </div>
  );
};

export default ClassFeatureComponent;
