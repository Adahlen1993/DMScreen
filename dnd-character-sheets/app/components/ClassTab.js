import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchClassesRequest,
  fetchCharacterClassesRequest,
  addClassRequest,
  addCharacterClassFeatures,
  addCharacterProficiencies,
} from "../../src/redux/actions/classes/index";
import CharacterClassTab from "./CharacterClassTab";

const ClassTab = ({ characterId }) => {
  const dispatch = useDispatch();

  // React state for managing the modal and selected class
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  // Selectors to get state from Redux store
  const {
    availableClasses,
    characterClasses,
    loading,
    error,
  } = useSelector((state) => state.classes);

  // Fetch character classes on initial mount to check if a class is already selected
  useEffect(() => {
    dispatch(fetchCharacterClassesRequest(characterId));
  }, [dispatch, characterId]);

  // Fetch available classes if no classes are selected for the character
  useEffect(() => {
    if (characterClasses.length === 0) {
      dispatch(fetchClassesRequest());
    }
  }, [dispatch, characterClasses]);

  const handleSelectClass = (classData) => {
    setSelectedClass(classData);
    setShowModal(true);
  };

  const handleAddClass = () => {
    dispatch(addClassRequest(characterId, selectedClass)).then(() => {
      // Add the class features and proficiencies
      dispatch(addCharacterClassFeatures(characterId, selectedClass.id));
      dispatch(addCharacterProficiencies(characterId, selectedClass.id));
      // Switch to CharacterClassTab
      dispatch({
        type: 'LOAD_EXISTING_CHARACTER_CLASSES',
        payload: [{ ...selectedClass, level: 1 }],
      });
      setShowModal(false);
    });
  };

  // If the character already has classes, show the CharacterClassTab
  if (characterClasses.length > 0) {
    return <CharacterClassTab characterClasses={characterClasses} />;
  }

  // If no classes are selected, show the list of available classes
  return (
    <div>
      <h2>Choose a Class</h2>
      {loading && <p>Loading classes...</p>}
      {error && <p>Error: {error}</p>}
      <div className="class-list">
        {availableClasses.map((classItem) => (
          <div key={classItem.id} className="class-item">
            <h3>{classItem.class_name}</h3>
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
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

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
