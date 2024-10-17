import React from 'react';

const ClassFeatureComponent = ({ feature, handleFeatureSelection, selectedValues = [] }) => {
  let { feature_name, description, choices, has_choices, number_of_options = 1, allow_duplicates } = feature;

  // Parse choices if it is a JSON string
  if (typeof choices === 'string') {
    try {
      choices = JSON.parse(choices);
    } catch (error) {
      console.error('Error parsing choices:', error);
      choices = [];
    }
  }

  // Debugging logs
  console.log('Feature:', feature);
  console.log('Selected Values:', selectedValues);

  return (
    <div className="feature-container">
      <h3>{feature_name}</h3>
      <p>{description}</p>
      {
        has_choices && choices && Array.isArray(choices) && choices.length > 0 ? (
          Array.from({ length: number_of_options }).map((_, idx) => (
            <div key={idx} className="feature-choice">
              <label htmlFor={`${feature_name}-select-${idx}`}>Choose an option:</label>
              <select
                id={`${feature_name}-select-${idx}`}
                value={selectedValues[idx] || ""}
                onChange={(e) => handleFeatureSelection(feature.id, e.target.value, idx)}
              >
                <option value="">--Select an option--</option>
                {choices
                  .filter((option) => allow_duplicates || !selectedValues.includes(option.value) || selectedValues[idx] === option.value)
                  .map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                  ))}
              </select>
            </div>
          ))
        ) : (
          <p>No choices available for this feature.</p>
        )
      }
    </div>
  );
};

export default ClassFeatureComponent;
