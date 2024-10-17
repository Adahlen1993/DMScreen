import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchClassesRequest, addClassRequest, addCharacterClassFeatures, addCharacterProficiencies } from "../../src/redux/actions/classes/index";
import CharacterClassTab from "./CharacterClassTab";

const ClassTab = ({ characterId }) => {
  const dispatch = useDispatch();

  // Selectors to get state from Redux store
  const {
    availableClasses,
    selectedClass,
    characterClasses,
    showModal,
  } = useSelector((state) => state.classes);

  // Fetch classes on initial mount
  useEffect(() => {
    dispatch(fetchClassesRequest(characterId));
  }, [dispatch, characterId]);

  // Check if a class has been selected on reload
  useEffect(() => {
    if (characterClasses.length > 0) {
      dispatch({ type: 'LOAD_EXISTING_CHARACTER_CLASSES', payload: characterClasses });
    }
  }, [dispatch, characterClasses]);

  const handleSelectClass = (classData) => {
    dispatch({ type: 'SELECT_CLASS', payload: classData });
  };

  const handleAddClass = () => {
    dispatch(addClassRequest(characterId, selectedClass)).then(() => {
      dispatch(addCharacterClassFeatures(characterId, selectedClass.id));
      dispatch(addCharacterProficiencies(characterId, selectedClass.id));
      // Switch to CharacterClassTab
      dispatch({ type: 'LOAD_EXISTING_CHARACTER_CLASSES', payload: [{ ...selectedClass, level: 1 }] });
    });
  };

  if (characterClasses.length > 0) {
    return <CharacterClassTab characterClasses={characterClasses} />;
  }

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
      `}</style>
    </div>
  );
};

export default ClassTab;
