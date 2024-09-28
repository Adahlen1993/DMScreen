import { useState, useEffect } from 'react';

export default function ClassTab() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classDetails, setClassDetails] = useState(null);
  const [classFeatures, setClassFeatures] = useState([]);
  const [skillProficiencies, setSkillProficiencies] = useState([]);  // Skill proficiencies
  const [selectedProficiencies, setSelectedProficiencies] = useState([]);  // Selected proficiencies
  const [selectedLevel, setSelectedLevel] = useState(1);  // Default to level 1
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch classes when the component loads
  useEffect(() => {
    async function fetchClasses() {
      try {
        const response = await fetch('/api/character-create/classes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setClasses(data);  // Assuming data is an array of classes
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    }
    fetchClasses();
  }, []);

  // Fetch class features and skill proficiencies for the selected class
  const fetchClassDetails = async (classId) => {
    try {
      const [featuresResponse, proficienciesResponse] = await Promise.all([
        fetch(`/api/character-create/class-features?class_id=${classId}&level=${selectedLevel}`),  // Fetch features up to the selected level
        fetch(`/api/character-create/class-proficiencies?class_id=${classId}`)  // Fetch skill proficiencies
      ]);

      if (!featuresResponse.ok || !proficienciesResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const [featuresData, proficienciesData] = await Promise.all([
        featuresResponse.json(),
        proficienciesResponse.json()
      ]);

      setClassFeatures(featuresData);  // Set class features for selected level
      setSkillProficiencies(proficienciesData);  // Set the available skill proficiencies
    } catch (error) {
      console.error('Error fetching class details:', error);
    }
  };

  // Handle class selection
  const handleClassSelect = (classId) => {
    const selected = classes.find((cls) => cls.id === classId);
    setSelectedClass(selected);
    setClassDetails(selected);
    setSelectedProficiencies([]);  // Reset selected proficiencies on class change
    setIsModalOpen(true);  // Open the modal when a class is clicked
    fetchClassDetails(classId);  // Fetch the details for the selected class and level
  };

  // Handle level selection and refetch class features
  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    if (selectedClass) {
      fetchClassDetails(selectedClass.id);  // Refetch features for the new level
    }
  };

  // Handle skill proficiency selection, limited to 2
  const handleProficiencySelect = (proficiencyId) => {
    if (selectedProficiencies.includes(proficiencyId)) {
      setSelectedProficiencies(selectedProficiencies.filter((id) => id !== proficiencyId));
    } else if (selectedProficiencies.length < 2) {
      setSelectedProficiencies([...selectedProficiencies, proficiencyId]);
    }
  };

  // Handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle form submission or save
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Class selected:', selectedClass);
    console.log('Skill proficiencies selected:', selectedProficiencies);  // Log selected skill proficiencies
    closeModal();  // Close modal on save
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Select Your Class</h2>

        {/* Class cards */}
        <div className="row">
          {Array.isArray(classes) && classes.length > 0 ? (
            classes.map((cls) => (
              <div key={cls.id} className="col-md-4" onClick={() => handleClassSelect(cls.id)}>
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">{cls.name}</h5>
                    <p className="card-text">{cls.description.substring(0, 100)}...</p>  {/* Shortened description */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No classes available</p>
          )}
        </div>

        {/* Class details modal */}
        {classDetails && (
          <div
            className={`modal fade ${isModalOpen ? 'show d-block' : ''}`}
            style={{ display: isModalOpen ? 'block' : 'none' }}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="classModalLabel"
            aria-hidden={!isModalOpen}
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="classModalLabel">{classDetails.name}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <p>{classDetails.description}</p>
                  <p>Hit Die: d{classDetails.hit_die}</p>
                  <p>Primary Ability: {classDetails.primary_ability}</p>

                  {/* Level selection */}
                  <div className="form-group">
                    <label htmlFor="levelSelect">Select Level:</label>
                    <select
                      id="levelSelect"
                      className="form-control"
                      value={selectedLevel}
                      onChange={(e) => handleLevelSelect(Number(e.target.value))}
                    >
                      {[...Array(20)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Display features based on selected level */}
                  <div className="mt-3">
                    <h4>Class Features</h4>
                    {classFeatures.length > 0 ? (
                      <ul>
                        {classFeatures.map((feature) => (
                          <li key={feature.id}>
                            <strong>{feature.feature_name}</strong>: {feature.description}
                            {feature.feature_name === 'Proficiencies' && (
                              <>
                                <ul>
                                  <li>Armor: Light armor, Medium armor, Shields</li>
                                  <li>Weapons: Simple weapons, Martial weapons</li>
                                  <li>Saving Throws: Strength, Constitution</li>
                                </ul>
                                <h5>Select 2 Skill Proficiencies</h5>
                                <ul>
                                  {skillProficiencies.map((prof) => (
                                    <li key={prof.id}>
                                      <label>
                                        <input
                                          type="checkbox"
                                          value={prof.id}
                                          checked={selectedProficiencies.includes(prof.id)}
                                          onChange={() => handleProficiencySelect(prof.id)}
                                          disabled={
                                            selectedProficiencies.length === 2 &&
                                            !selectedProficiencies.includes(prof.id)
                                          }
                                        />
                                        {prof.name}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No features available for this level.</p>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Select {classDetails.name}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary mt-3" disabled={!selectedClass}>
          Save Class
        </button>
      </form>
    </div>
  );
}
