import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  fetchSpecificCharacterClassesRequest,
  fetchSpecificCharacterClassFeaturesRequest,
} from "../../src/redux/actions/characters/class/specific/index";
import { updateCharacterLevelRequest } from "../../src/redux/actions/characters/class/specific/level/index";
import ClassFeatureComponent from "./ClassFeatures";

const CharacterClassTab = ({ characterId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedValuesMap, setSelectedValuesMap] = useState({}); // Track selected values for each feature

  // Select character classes and features from Redux store
  const characterClassesData = useSelector(
    (state) => state.specificCharacter.characterClasses
  );
  const characterClasses = characterClassesData?.data || []; // Extract data from characterClasses state
  const classFeaturesData = useSelector(
    (state) => state.specificCharacter.classFeatures
  );
  const classFeatures = classFeaturesData?.data || []; // Extract data from classFeatures state
  const loading = useSelector((state) => state.specificCharacter.loading);
  const error = useSelector((state) => state.specificCharacter.error);

  useEffect(() => {
    // Dispatch action to fetch the character's classes
    dispatch(fetchSpecificCharacterClassesRequest(characterId));
  }, [dispatch, characterId]);

  useEffect(() => {
    console.log("Character Classes State:", characterClassesData);
    if (characterClasses && characterClasses.length > 0) {
      console.log("Fetched Character Classes:", characterClasses); // Debugging log to verify data
      const initialClass = characterClasses[0];
      if (initialClass) {
        dispatch(
          fetchSpecificCharacterClassFeaturesRequest(
            characterId,
            initialClass.class_id
          )
        ); // Use class_id from the characterClasses
        setSelectedLevel(initialClass.level || 1); // Set initial level from the character class
      }
    } else {
      console.log("No character classes found.");
    }
  }, [characterClassesData, characterClasses, dispatch, characterId]);

  useEffect(() => {
    console.log("Class Features State:", classFeatures); // Log class features to verify data
  }, [classFeatures]);

  const handleLevelChange = (event) => {
    const newLevel = parseInt(event.target.value, 10);
    setSelectedLevel(newLevel);
    if (characterClasses.length > 0) {
      const classId = characterClasses[0].class_id;
      dispatch(updateCharacterLevelRequest(characterId, classId, newLevel)); // Dispatch saga action to update character class level
    }
  };

  const handleFeatureSelection = (featureId, value, idx) => {
    setSelectedValuesMap((prev) => {
      const updatedValues = { ...prev };
      if (!updatedValues[featureId]) {
        updatedValues[featureId] = [];
      }
      updatedValues[featureId][idx] = value;
      return updatedValues;
    });
  };

  return (
    <div>
      <h2>
        {characterClasses.length > 0
          ? characterClasses[0].class_name
          : "Character Classes"}
      </h2>

      {loading ? (
        <p>Loading character classes...</p>
      ) : error ? (
        <p>Error loading character classes: {error}</p>
      ) : (
        <div className="class-features">
          <label htmlFor="level-select">Select Level: </label>
          <select
            id="level-select"
            value={selectedLevel}
            onChange={handleLevelChange}
          >
            {[...Array(20).keys()].map((level) => (
              <option key={level + 1} value={level + 1}>
                {level + 1}
              </option>
            ))}
          </select>
          <h5>Class Features</h5>
          {classFeatures && classFeatures.length > 0 ? (
            classFeatures
              .filter((feature) => feature.level <= selectedLevel) // Only show features up to the selected level
              .map((feature, index) => (
                <ClassFeatureComponent
                  key={index}
                  feature={feature}
                  selectedValues={selectedValuesMap[feature.id] || []} // Pass selectedValues from state
                  handleFeatureSelection={handleFeatureSelection} // Update selected values
                />
              ))
          ) : (
            <p>No features available for this class.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CharacterClassTab;
