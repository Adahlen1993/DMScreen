import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchClassesRequest, addClassRequest, levelUpClassRequest, updateFeatureSelection } from "../../src/redux/actions";
import ClassFeatureComponent from "./ClassFeatures";

const ClassTab = ({ characterId }) => {
  const dispatch = useDispatch();

  // Selectors to get state from Redux store
  const {
    availableClasses,
    selectedClass,
    characterClasses,
    classFeatures,
    selectedValues,
    showModal,
    showSubclassModal,
    availableSubclasses,
    selectedClassIndex,
  } = useSelector((state) => state.classes);

  // Fetch classes on initial mount
  useEffect(() => {
    dispatch(fetchClassesRequest(characterId));
  }, [dispatch, characterId]);

  const handleSelectClass = (classData) => {
    dispatch({ type: 'SELECT_CLASS', payload: classData });
  };

  const handleAddClass = () => {
    dispatch(addClassRequest(characterId, selectedClass));
  };

  const handleLevelUp = (classItem, index) => {
    dispatch(levelUpClassRequest(characterId, classItem, index));
  };

  const handleFeatureSelection = (featureId, selectedValue, optionIndex) => {
    dispatch(updateFeatureSelection(featureId, selectedValue, optionIndex));
  };

  return (
    <div>
      <h2>Choose a Class</h2>
      <div className="class-list">
        {availableClasses.map((classItem) => (
          <div key={classItem.id} className="class-item">
            <h3>{classItem.name}</h3>
            <p>{classItem.description}</p>
            <button onClick={() => handleSelectClass(classItem)}>Select</button>
          </div>
        ))}
      </div>

      {showModal && selectedClass && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedClass.name}</h2>
            <p>{selectedClass.description}</p>
            <button onClick={handleAddClass}>Add Class</button>
            <button onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>Cancel</button>
          </div>
        </div>
      )}

      <h3>Your Selected Classes:</h3>
      <div className="character-classes">
        {characterClasses.map((classItem, index) => (
          <div key={index}>
            <h4>
              {classItem.name} (Level {classItem.level})
            </h4>
            <button onClick={() => handleLevelUp(classItem, index)}>Level Up</button>
            {classItem.level >= 3 && !classItem.subclass && (
              <button onClick={() => dispatch({ type: 'SELECT_SUBCLASS', payload: { classItem, index } })}>
                Select Subclass
              </button>
            )}
            {classItem.subclass && <p>Subclass: {classItem.subclass.subclass_name}</p>}
            <button onClick={() => alert("Remove class functionality here!")}>Remove</button>

            {/* Display Class Features */}
            {classFeatures[`class-${classItem.id}`] &&
              Array.isArray(classFeatures[`class-${classItem.id}`]) && (
                <div className="class-features">
                  <h5>{classItem.name} Features</h5>
                  {classFeatures[`class-${classItem.id}`].map((feature, featureIndex) => (
                    <ClassFeatureComponent
                      key={featureIndex}
                      feature={feature}
                      handleFeatureSelection={handleFeatureSelection}
                      selectedValues={selectedValues[feature.feature_name] || []}
                    />
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>

      {/* Add basic styles */}
      <style jsx>{`
        .class-list {
          display: flex;
          flex-wrap: wrap;
        }
        .class-item {
          border: 1px solid #ccc;
          padding: 16px;
          margin: 8px;
          width: 200px;
          text-align: center;
        }
        .modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 20px;
          border: 1px solid #ccc;
          z-index: 1000;
        }
        .modal-content {
          text-align: center;
        }
        .character-classes {
          margin-top: 20px;
        }
        .class-features {
          margin-top: 10px;
        }
        .class-features details {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default ClassTab;
