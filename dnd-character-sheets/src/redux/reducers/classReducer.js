// Fetch all classes
export const fetchClassesRequest = () => ({
    type: 'FETCH_CLASSES_REQUEST',
  });
  
  export const fetchClassesSuccess = (classes) => ({
    type: 'FETCH_CLASSES_SUCCESS',
    payload: classes,
  });
  
  export const fetchClassesFailure = (error) => ({
    type: 'FETCH_CLASSES_FAILURE',
    payload: error,
  });
  
  // Fetch a specific class by classId
  export const fetchClassByIdRequest = (classId) => ({
    type: 'FETCH_CLASS_BY_ID_REQUEST',
    payload: classId,
  });
  
  export const fetchClassByIdSuccess = (classData) => ({
    type: 'FETCH_CLASS_BY_ID_SUCCESS',
    payload: classData,
  });
  
  export const fetchClassByIdFailure = (error) => ({
    type: 'FETCH_CLASS_BY_ID_FAILURE',
    payload: error,
  });
  
  // Add a class to the character
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
  