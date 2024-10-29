// Actions for fetching character classes
export const fetchCharacterClassesRequest = (characterId) => ({
    type: 'FETCH_CHARACTER_CLASSES_REQUEST',
    payload: characterId,
  });
  
  export const fetchCharacterClassesSuccess = (characterClasses) => ({
    type: 'FETCH_CHARACTER_CLASSES_SUCCESS',
    payload: characterClasses,
  });
  
  export const fetchCharacterClassesFailure = (error) => ({
    type: 'FETCH_CHARACTER_CLASSES_FAILURE',
    payload: error,
  });
  
  // Actions for fetching class features
  export const fetchClassFeaturesRequest = (characterId, classId, level) => ({
    type: 'FETCH_CLASS_FEATURES_REQUEST',
    payload: { characterId, classId, level },
  });
  
  export const fetchClassFeaturesSuccess = (classFeatures) => ({
    type: 'FETCH_CLASS_FEATURES_SUCCESS',
    payload: classFeatures,
  });
  
  export const fetchClassFeaturesFailure = (error) => ({
    type: 'FETCH_CLASS_FEATURES_FAILURE',
    payload: error,
  });
  
  // Action for updating character class level
  export const updateCharacterClassLevel = (characterId, classId, newLevel) => ({
    type: 'UPDATE_CHARACTER_CLASS_LEVEL_REQUEST',
    payload: { characterId, classId, newLevel },
  });
  
  export const updateCharacterClassLevelSuccess = (updatedClass) => ({
    type: 'UPDATE_CHARACTER_CLASS_LEVEL_SUCCESS',
    payload: updatedClass,
  });
  
  export const updateCharacterClassLevelFailure = (error) => ({
    type: 'UPDATE_CHARACTER_CLASS_LEVEL_FAILURE',
    payload: error,
  });
  