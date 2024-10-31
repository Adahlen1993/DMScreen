import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCharacterClassesRequest } from "../../src/redux/actions/characters/index";
import {
  fetchClassesRequest,
  addClassRequest,
  addCharacterClassFeatures,
  addCharacterProficiencies,
} from "../../src/redux/actions/classes/index";
import CharacterClassTab from "./CharacterClassTab";

const ClassTab = ({ characterId, setActiveTab }) => {
  const dispatch = useDispatch();

  // React state for managing the modal and selected class
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classAdded, setClassAdded] = useState(false);

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

  // If the character already has classes, switch to CharacterClassTab
  useEffect(() => {
    if (characterClasses.length > 0) {
      setActiveTab('character-class');
    }
  }, [characterClasses, setActiveTab]);

  // Fetch available classes if no classes are selected for the character
  useEffect(() => {
    if (!loading && characterClasses.length === 0 && availableClasses.length === 0) {
      dispatch(fetchClassesRequest());
    }
  }, [dispatch, characterClasses, loading, availableClasses]);

  // Update component when a class is added
  useEffect(() => {
    if (classAdded) {
      setClassAdded(false);
      setActiveTab('character-class');
    }
  }, [classAdded, setActiveTab]);

  const handleSelectClass = (classData) => {
    setSelectedClass(classData);
    setShowModal(true);
  };

  const handleAddClass = () => {
    dispatch(addClassRequest(characterId, selectedClass));
    setShowModal(false);
    setSelectedClass(null);
    setClassAdded(true);
  };

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
            <h2>{selectedClass.class_name}</h2>
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
