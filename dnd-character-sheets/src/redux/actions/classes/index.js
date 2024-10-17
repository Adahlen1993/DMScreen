// Actions for fetching classes
export const fetchClassesRequest = (characterId) => ({
    type: 'FETCH_CLASSES_REQUEST',
    payload: characterId,
  });
  
  export const fetchClassesSuccess = (classes) => ({
    type: 'FETCH_CLASSES_SUCCESS',
    payload: classes,
  });
  
  export const fetchClassesFailure = (error) => ({
    type: 'FETCH_CLASSES_FAILURE',
    payload: error,
  });
  
  // Action for selecting a class
  export const selectClass = (classData) => ({
    type: 'SELECT_CLASS',
    payload: classData,
  });
  
  // Action for adding a class to character_classes table
  export const addClassRequest = (characterId, selectedClass) => ({
    type: 'ADD_CLASS_REQUEST',
    payload: { characterId, selectedClass },
  });
  
  export const addClassSuccess = (characterClass) => ({
    type: 'ADD_CLASS_SUCCESS',
    payload: characterClass,
  });
  
  export const addClassFailure = (error) => ({
    type: 'ADD_CLASS_FAILURE',
    payload: error,
  });
  
  // Action for adding class features to character_class_features table
  export const addCharacterClassFeatures = (characterId, classId) => ({
    type: 'ADD_CHARACTER_CLASS_FEATURES_REQUEST',
    payload: { characterId, classId },
  });
  
  // Action for adding proficiencies to character_proficiencies table
  export const addCharacterProficiencies = (characterId, classId) => ({
    type: 'ADD_CHARACTER_PROFICIENCIES_REQUEST',
    payload: { characterId, classId },
  });
  