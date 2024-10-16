import React, { useState, useEffect } from "react";

const ClassTab = ({ characterId }) => {
  const [availableClasses, setAvailableClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [characterClasses, setCharacterClasses] = useState([]);
  const [classFeatures, setClassFeatures] = useState({});

  // Fetch classes from the API route
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(
          `/api/characters/create/class/${characterId}`
        );
        const data = await response.json();
        setAvailableClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, [characterId]);

  const handleSelectClass = (classData) => {
    setSelectedClass(classData);
    setShowModal(true);
  };

  const handleAddClass = async () => {
    try {
      const response = await fetch(
        `/api/characters/create/class/${characterId}/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ classId: selectedClass.id, level: 1 }),
        }
      );
      const result = await response.json();

      if (result.success) {
        setCharacterClasses([
          ...characterClasses,
          { ...selectedClass, level: 1 },
        ]);
        setShowModal(false);

        // Fetch level 1 class features immediately after adding the class
        fetchClassFeatures(selectedClass.id, 1);
      } else {
        console.error("Failed to add class:", result.error);
      }
    } catch (error) {
      console.error("Error adding class:", error);
    }
  };

  const handleLevelUp = async (classItem, index) => {
    const newLevel = classItem.level + 1;

    try {
      // Send a request to level up the class
      const response = await fetch(
        `/api/characters/create/class/${characterId}/level-up`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ classId: classItem.id, newLevel }),
        }
      );
      const result = await response.json();

      if (result.success) {
        // Update class level in the state
        const updatedClasses = [...characterClasses];
        updatedClasses[index].level = newLevel;
        setCharacterClasses(updatedClasses);

        // Update features after leveling up
        setClassFeatures((prevState) => ({
          ...prevState,
          [classItem.id]: result.features,
        }));
      } else {
        console.error("Failed to level up:", result.error);
      }
    } catch (error) {
      console.error("Error leveling up:", error);
    }
  };

  const fetchClassFeatures = async (classId, level) => {
    try {
      const response = await fetch(
        `/api/characters/create/features/class/${characterId}?classId=${classId}&level=${level}`
      );
      const data = await response.json();
      console.log("Fetched Features:", data); // Log the fetched data
      setClassFeatures((prevState) => ({ ...prevState, [classId]: data }));
    } catch (error) {
      console.error("Error fetching class features:", error);
    }
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
            <button onClick={() => setShowModal(false)}>Cancel</button>
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
            <button onClick={() => handleLevelUp(classItem, index)}>
              Level Up
            </button>
            <button onClick={() => alert("Remove class functionality here!")}>
              Remove
            </button>
            {classFeatures[classItem.id] &&
              Array.isArray(classFeatures[classItem.id]) && (
                <div className="class-features">
                  {classFeatures[classItem.id].map((feature, featureIndex) => (
                    <details key={featureIndex}>
                      <summary>{feature.feature_name}</summary>
                      <p>{feature.description}</p>
                    </details>
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
