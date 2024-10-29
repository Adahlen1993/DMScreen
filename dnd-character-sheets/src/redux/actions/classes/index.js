// Actions for adding a class to a character
export const addClassRequest = (characterId, selectedClass) => ({
  type: 'ADD_CLASS_REQUEST',
  payload: { characterId, selectedClass },
});

export const addClassSuccess = (addedClass) => ({
  type: 'ADD_CLASS_SUCCESS',
  payload: addedClass,
});

export const addClassFailure = (error) => ({
  type: 'ADD_CLASS_FAILURE',
  payload: error,
});

// Actions for adding character class features
export const addCharacterClassFeaturesRequest = (characterId, classId) => ({
  type: 'ADD_CHARACTER_CLASS_FEATURES_REQUEST',
  payload: { characterId, classId },
});

export const addCharacterClassFeaturesSuccess = (classFeatures) => ({
  type: 'ADD_CHARACTER_CLASS_FEATURES_SUCCESS',
  payload: classFeatures,
});

export const addCharacterClassFeaturesFailure = (error) => ({
  type: 'ADD_CHARACTER_CLASS_FEATURES_FAILURE',
  payload: error,
});

// Actions for adding character proficiencies
export const addCharacterProficienciesRequest = (characterId, classId) => ({
  type: 'ADD_CHARACTER_PROFICIENCIES_REQUEST',
  payload: { characterId, classId },
});

export const addCharacterProficienciesSuccess = (proficiencies) => ({
  type: 'ADD_CHARACTER_PROFICIENCIES_SUCCESS',
  payload: proficiencies,
});

export const addCharacterProficienciesFailure = (error) => ({
  type: 'ADD_CHARACTER_PROFICIENCIES_FAILURE',
  payload: error,
});

// Actions for fetching available classes
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
