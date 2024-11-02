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

  // Actions for fetching character class features (renamed for better clarity)
export const fetchCharacterClassFeaturesRequest = (characterId, classId) => ({
    type: 'FETCH_CHARACTER_CLASS_FEATURES_REQUEST',
    payload: { characterId, classId },
  });
  
  export const fetchCharacterClassFeaturesSuccess = (classFeatures) => ({
    type: 'FETCH_CHARACTER_CLASS_FEATURES_SUCCESS',
    payload: classFeatures,
  });
  
  export const fetchCharacterClassFeaturesFailure = (error) => ({
    type: 'FETCH_CHARACTER_CLASS_FEATURES_FAILURE',
    payload: error,
  });
  

  