import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchSpecificCharacterClassesRequest, fetchSpecificCharacterClassFeaturesRequest } from "../../src/redux/actions/characters/class/specific/index";
import ClassFeatureComponent from "./ClassFeatures";

const CharacterClassTab = ({ characterId }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Select character classes and features from Redux store
  const characterClassesData = useSelector((state) => state.specificCharacter.characterClasses);
  const characterClasses = characterClassesData?.data || []; // Extract data from characterClasses state
  const classFeaturesData = useSelector((state) => state.specificCharacter.classFeatures);
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
        dispatch(fetchSpecificCharacterClassFeaturesRequest(characterId, initialClass.class_id)); // Use class_id from the characterClasses
      }
    } else {
      console.log("No character classes found.");
    }
  }, [characterClassesData, characterClasses, dispatch, characterId]);

  useEffect(() => {
    console.log("Class Features State:", classFeatures); // Log class features to verify data
  }, [classFeatures]);

  return (
    <div>
      <h2>{characterClasses.length > 0 ? characterClasses[0].class_name : 'Character Classes'}</h2>

      {loading ? (
        <p>Loading character classes...</p>
      ) : error ? (
        <p>Error loading character classes: {error}</p>
      ) : (
        <div className="class-features">
          <h5>Class Features</h5>
          {classFeatures && classFeatures.length > 0 ? (
            classFeatures.map((feature, index) => (
              <ClassFeatureComponent key={index} feature={feature} />
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
