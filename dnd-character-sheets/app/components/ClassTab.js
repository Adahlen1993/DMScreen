import { useEffect, useState } from 'react';

function ClassSelectionTab({ characterId }) {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [confirmedClass, setConfirmedClass] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(1);
    const [classFeatures, setClassFeatures] = useState([]);

    useEffect(() => {
        async function fetchClasses() {
            try {
                const response = await fetch('/api/classes');
                const data = await response.json();
                setClasses(data);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        }

        fetchClasses();
    }, []); // Run only on mount

    useEffect(() => {
      if (confirmedClass) {
          fetchClassDetails(confirmedClass.id, selectedLevel);
      }
  }, [confirmedClass, selectedLevel]);
  

    const handleClassSelect = (classItem) => {
        setSelectedClass(classItem);
    };

    const handleConfirmClass = () => {
        setConfirmedClass(selectedClass);
        setSelectedClass(null);
    };

    const handleLevelChange = (event) => {
        setSelectedLevel(parseInt(event.target.value, 10));
    };

    const fetchClassDetails = async (classId, level) => {
      try {
          const response = await fetch(`/api/classes/${classId}?includeFeatures=true`);
          const classData = await response.json();
          setClassFeatures(classData.features.filter(feature => feature.level <= level));
      } catch (error) {
          console.error('Error fetching class details:', error);
      }
  };
  
  

    return (
        <div>
            {!confirmedClass ? (
                !selectedClass ? (
                    <div>
                        <h2>Select Your Class</h2>
                        <ul>
                            {Array.isArray(classes) && classes.length > 0 ? (
                                classes.map((classItem) => (
                                    <li key={classItem.id}>
                                        <button onClick={() => handleClassSelect(classItem)}>
                                            {classItem.class_name}
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <p>Loading classes or no classes available...</p>
                            )}
                        </ul>
                    </div>
                ) : (
                    <div>
                        <h2>{selectedClass.class_name}</h2>
                        <p>{selectedClass.description}</p>
                        <button onClick={handleConfirmClass}>Confirm Class</button>
                    </div>
                )
            ) : (
                <div>
                    <h2>{confirmedClass.class_name}</h2>
                    <p>{confirmedClass.description}</p>
                    <div>
                        <label htmlFor="level">Select Level:</label>
                        <select id="level" value={selectedLevel} onChange={handleLevelChange}>
                            {Array.from({ length: 20 }, (_, i) => i + 1).map((level) => (
                                <option key={level} value={level}>
                                    Level {level}
                                </option>
                            ))}
                        </select>
                    </div>
                    {classFeatures.length > 0 && (
                        <div>
                            <h3>Class Features at Level {selectedLevel}</h3>
                            <ul>
                                {classFeatures.map((feature, index) => (
                                    <li key={index}>
                                        <strong>{feature.name}</strong>: {feature.description}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ClassSelectionTab;