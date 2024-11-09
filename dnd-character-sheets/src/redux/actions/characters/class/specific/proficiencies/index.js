// Action types
export const FETCH_CHARACTER_PROFICIENCY_REQUEST = 'FETCH_CHARACTER_PROFICIENCY_REQUEST';
export const FETCH_CHARACTER_PROFICIENCY_SUCCESS = 'FETCH_CHARACTER_PROFICIENCY_SUCCESS';
export const FETCH_CHARACTER_PROFICIENCY_FAILURE = 'FETCH_CHARACTER_PROFICIENCY_FAILURE';

export const SAVE_CHARACTER_PROFICIENCY_REQUEST = 'SAVE_CHARACTER_PROFICIENCY_REQUEST';
export const SAVE_CHARACTER_PROFICIENCY_SUCCESS = 'SAVE_CHARACTER_PROFICIENCY_SUCCESS';
export const SAVE_CHARACTER_PROFICIENCY_FAILURE = 'SAVE_CHARACTER_PROFICIENCY_FAILURE';

export const UPDATE_CHARACTER_PROFICIENCY_REQUEST = 'UPDATE_CHARACTER_PROFICIENCY_REQUEST';
export const UPDATE_CHARACTER_PROFICIENCY_SUCCESS = 'UPDATE_CHARACTER_PROFICIENCY_SUCCESS';
export const UPDATE_CHARACTER_PROFICIENCY_FAILURE = 'UPDATE_CHARACTER_PROFICIENCY_FAILURE';

// Action creators
export const fetchCharacterProficiencyRequest = (characterId) => ({
  type: FETCH_CHARACTER_PROFICIENCY_REQUEST,
  payload: { characterId },
});

export const fetchCharacterProficiencySuccess = (proficiencies) => ({
  type: FETCH_CHARACTER_PROFICIENCY_SUCCESS,
  payload: { proficiencies },
});

export const fetchCharacterProficiencyFailure = (error) => ({
  type: FETCH_CHARACTER_PROFICIENCY_FAILURE,
  payload: error,
});

export const saveCharacterProficiencyRequest = (characterId, selectedValues, label) => ({
  type: SAVE_CHARACTER_PROFICIENCY_REQUEST,
  payload: { characterId, selectedValues, label },
});

export const saveCharacterProficiencySuccess = (proficiencies) => ({
  type: SAVE_CHARACTER_PROFICIENCY_SUCCESS,
  payload: { proficiencies },
});

export const saveCharacterProficiencyFailure = (error) => ({
  type: SAVE_CHARACTER_PROFICIENCY_FAILURE,
  payload: error,
});

export const updateCharacterProficiencyRequest = (characterId, selectedValues, label) => ({
  type: UPDATE_CHARACTER_PROFICIENCY_REQUEST,
  payload: { characterId, selectedValues, label },
});

export const updateCharacterProficiencySuccess = (proficiencies) => ({
  type: UPDATE_CHARACTER_PROFICIENCY_SUCCESS,
  payload: { proficiencies },
});

export const updateCharacterProficiencyFailure = (error) => ({
  type: UPDATE_CHARACTER_PROFICIENCY_FAILURE,
  payload: error,
});


