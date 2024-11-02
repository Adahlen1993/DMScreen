// Actions for fetching character class features for a specific character
export const FETCH_SPECIFIC_CHARACTER_CLASS_FEATURES_REQUEST = 'FETCH_SPECIFIC_CHARACTER_CLASS_FEATURES_REQUEST';
export const FETCH_SPECIFIC_CHARACTER_CLASS_FEATURES_SUCCESS = 'FETCH_SPECIFIC_CHARACTER_CLASS_FEATURES_SUCCESS';
export const FETCH_SPECIFIC_CHARACTER_CLASS_FEATURES_FAILURE = 'FETCH_SPECIFIC_CHARACTER_CLASS_FEATURES_FAILURE';

export const fetchSpecificCharacterClassFeaturesRequest = (characterId, classId) => ({
  type: FETCH_SPECIFIC_CHARACTER_CLASS_FEATURES_REQUEST,
  payload: { characterId, classId },
});

export const fetchSpecificCharacterClassFeaturesSuccess = (classId, features) => ({
  type: FETCH_SPECIFIC_CHARACTER_CLASS_FEATURES_SUCCESS,
  payload: { classId, features },
});

export const fetchSpecificCharacterClassFeaturesFailure = (error) => ({
  type: FETCH_SPECIFIC_CHARACTER_CLASS_FEATURES_FAILURE,
  payload: error,
});
// Actions for fetching character classes for a specific character
export const FETCH_SPECIFIC_CHARACTER_CLASSES_REQUEST = 'FETCH_SPECIFIC_CHARACTER_CLASSES_REQUEST';
export const FETCH_SPECIFIC_CHARACTER_CLASSES_SUCCESS = 'FETCH_SPECIFIC_CHARACTER_CLASSES_SUCCESS';
export const FETCH_SPECIFIC_CHARACTER_CLASSES_FAILURE = 'FETCH_SPECIFIC_CHARACTER_CLASSES_FAILURE';

export const fetchSpecificCharacterClassesRequest = (characterId) => ({
  type: FETCH_SPECIFIC_CHARACTER_CLASSES_REQUEST,
  payload: characterId,
});

export const fetchSpecificCharacterClassesSuccess = (characterClasses) => ({
  type: FETCH_SPECIFIC_CHARACTER_CLASSES_SUCCESS,
  payload: characterClasses,
});

export const fetchSpecificCharacterClassesFailure = (error) => ({
  type: FETCH_SPECIFIC_CHARACTER_CLASSES_FAILURE,
  payload: error,
});
// Actions for fetching a specific character
export const FETCH_SPECIFIC_CHARACTER_REQUEST = 'FETCH_SPECIFIC_CHARACTER_REQUEST';
export const FETCH_SPECIFIC_CHARACTER_SUCCESS = 'FETCH_SPECIFIC_CHARACTER_SUCCESS';
export const FETCH_SPECIFIC_CHARACTER_FAILURE = 'FETCH_SPECIFIC_CHARACTER_FAILURE';

export const fetchSpecificCharacterRequest = (characterId) => ({
  type: FETCH_SPECIFIC_CHARACTER_REQUEST,
  payload: characterId,
});

export const fetchSpecificCharacterSuccess = (character) => ({
  type: FETCH_SPECIFIC_CHARACTER_SUCCESS,
  payload: character,
});

export const fetchSpecificCharacterFailure = (error) => ({
  type: FETCH_SPECIFIC_CHARACTER_FAILURE,
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