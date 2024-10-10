import { useEffect, useState } from 'react';
import CharacterClassTab from './CharacterClassTab';

function ClassSelectionTab({ characterId, setActiveTab }) {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [confirmedClass, setConfirmedClass] = useState(null);

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

    const handleClassSelect = (classItem) => {
        console.log(classItem);
        setSelectedClass(classItem);
    };

    const handleConfirmClass = async () => {
        console.log(selectedClass?.id);
        if (!selectedClass) {
            console.error('No class selected');
            return;
        }

        try {
            const response = await fetch(`/api/characters/create/class/${characterId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ characterId, class_id: selectedClass.id }),
            });

            if (response.ok) {
                setConfirmedClass(selectedClass);
                setSelectedClass(null);
                setActiveTab('character-class'); // Switch to the 'class' tab after confirming
            } else {
                console.error('Failed to save character class');
            }
        } catch (error) {
            console.error('Error confirming class:', error);
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
                </div>
            )}
        </div>
    );
}

export default ClassSelectionTab;
