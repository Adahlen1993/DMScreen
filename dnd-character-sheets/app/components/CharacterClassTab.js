import React, { useState, useEffect } from 'react';

function CharacterClassTab({ characterClasses }) {
    const [activeTab, setActiveTab] = useState(0);
    const [classFeatures, setClassFeatures] = useState([]);

    useEffect(() => {
        async function fetchClassFeatures(classId) {
            try {
                const response = await fetch(`/api/classes/${classId}/features`);
                const data = await response.json();
                setClassFeatures(data.features);
            } catch (error) {
                console.error('Error fetching class features:', error);
            }
        }

        if (characterClasses.length > 0) {
            fetchClassFeatures(characterClasses[activeTab].id);
        }
    }, [activeTab, characterClasses]);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div>
            <h2>Character Class Tab</h2>
            <div className="tabs">
                {characterClasses.map((charClass, index) => (
                    <button
                        key={index}
                        className={activeTab === index ? 'active' : ''}
                        onClick={() => handleTabClick(index)}
                    >
                        {charClass.class_name}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                <h3>{characterClasses[activeTab].class_name}</h3>
                <div>
                    {classFeatures.length > 0 ? (
                        <ul>
                            {classFeatures.map((feature, index) => (
                                <li key={index}>
                                    <strong>{feature.name}</strong>: {feature.description}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Loading features or no features available...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CharacterClassTab;