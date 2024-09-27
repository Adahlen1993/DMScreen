import { useState, useEffect } from 'react';

export default function ClassTab() {
  // State for available classes
  const [classes, setClasses] = useState([]); // Ensure classes is an empty array initially
  const [selectedClass, setSelectedClass] = useState(null);
  const [classDetails, setClassDetails] = useState(null);

  // Fetch classes when the component loads
  useEffect(() => {
    async function fetchClasses() {
      try {
        const response = await fetch('/api/character-create/classes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setClasses(data); // Assuming data is an array of classes
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    }
    fetchClasses();
  }, []);

  // Handle class selection
  const handleClassSelect = (classId) => {
    const selected = classes.find((cls) => cls.id === classId);
    setSelectedClass(selected);
    setClassDetails(selected); // Assuming selected contains details
  };

  // Handle submission or save (assuming it’s part of a larger form)
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Class selected:', selectedClass);
    // Implement the save functionality here
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Select Your Class</h2>
      
      {/* Class dropdown or list */}
      <div>
        <label>
          Class:
          <select onChange={(e) => handleClassSelect(e.target.value)}>
            <option value="">Select a class</option>
            {Array.isArray(classes) && classes.length > 0 ? (
              classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))
            ) : (
              <option value="">No classes available</option>
            )}
          </select>
        </label>
      </div>

      {/* Display selected class details */}
      {classDetails && (
        <div>
          <h3>{classDetails.name}</h3>
          <p>{classDetails.description}</p>
          <p>Hit Die: d{classDetails.hit_die}</p>
          <p>Primary Ability: {classDetails.primary_ability}</p>
          <p>Saving Throws: {classDetails.saving_throws}</p>
          {/* You can expand this to show other class-related details */}
        </div>
      )}

      <button type="submit" disabled={!selectedClass}>Save Class</button>
    </form>
  );
}
