import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchCharacterClassesRequest, fetchClassFeaturesRequest, updateCharacterClassLevel } from "../../src/redux/actions/characters/class/index";
import ClassFeatureComponent from "./ClassFeatures";

const CharacterClassTab = ({ characterId }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // React state for managing selected class and level changes
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(1);

  // Select character classes and features from Redux store
  const { characterClasses, classFeatures, loading, error } = useSelector((state) => state.classes);

  useEffect(() => {
    // Dispatch action to fetch the character's classes
    dispatch(fetchCharacterClassesRequest(characterId));
  }, [dispatch, characterId]);

  const handleLevelChange = (classId, newLevel) => {
    setSelectedClassId(classId);
    setSelectedLevel(newLevel);
    // Dispatch action to update the character class level
    dispatch(updateCharacterClassLevel(characterId, classId, newLevel));
    // Fetch updated class features based on new level
    dispatch(fetchClassFeaturesRequest(characterId, classId, newLevel));
  };

  return (
    <div>
      <h2>Character Classes</h2>

      {loading ? (
        <p>Loading character classes...</p>
      ) : error ? (
        <p>Error loading character classes: {error}</p>
      ) : characterClasses.length > 0 ? (
        <div className="character-classes">
          {characterClasses.map((classItem, index) => (
            <div key={index} className="class-item">
              <h4>{classItem.name}</h4>
              <label htmlFor={`level-select-${index}`}>Level: </label>
              <select
                id={`level-select-${index}`}
                value={classItem.id === selectedClassId ? selectedLevel : classItem.level}
                onChange={(e) => handleLevelChange(classItem.id, parseInt(e.target.value))}
              >
                {[...Array(20).keys()].map((level) => (
                  <option key={level + 1} value={level + 1}>
                    {level + 1}
                  </option>
                ))}
              </select>
              {classItem.subclass && <p>Subclass: {classItem.subclass.subclass_name}</p>}
              {classFeatures[`class-${classItem.id}`] && (
                <div className="class-features">
                  <h5>Features</h5>
                  {classFeatures[`class-${classItem.id}`].map((feature, featureIndex) => (
                    <ClassFeatureComponent
                      key={featureIndex}
                      feature={feature}
                      selectedValues={[]}
                      handleFeatureSelection={() => {}}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No classes chosen yet.</p>
      )}

      {/* Add basic styles */}
      <style jsx>{`
        .character-classes {
          margin-top: 20px;
        }
        .class-item {
          border: 1px solid #ccc;
          padding: 16px;
          margin: 8px;
          width: 300px;
          text-align: center;
        }
        .class-features {
          margin-top: 10px;
        }
        .feature-item {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default CharacterClassTab;
