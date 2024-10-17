export const fetchClassesRequest = (characterId) => ({
    type: 'FETCH_CLASSES_REQUEST',
    payload: characterId,
  });
  
  export const addClassRequest = (characterId, selectedClass) => ({
    type: 'ADD_CLASS_REQUEST',
    payload: { characterId, selectedClass },
  });
  
  export const levelUpClassRequest = (characterId, classItem, index) => ({
    type: 'LEVEL_UP_CLASS_REQUEST',
    payload: { characterId, classItem, index },
  });
  
  export const updateFeatureSelection = (featureId, selectedValue, optionIndex) => ({
    type: 'UPDATE_FEATURE_SELECTION',
    payload: { featureId, selectedValue, optionIndex },
  });
  