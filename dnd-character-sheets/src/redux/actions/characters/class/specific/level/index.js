// src/redux/actions/characters/class/updateCharacterLevel.js

export const UPDATE_CHARACTER_LEVEL_REQUEST = 'UPDATE_CHARACTER_LEVEL_REQUEST';
export const UPDATE_CHARACTER_LEVEL_SUCCESS = 'UPDATE_CHARACTER_LEVEL_SUCCESS';
export const UPDATE_CHARACTER_LEVEL_FAILURE = 'UPDATE_CHARACTER_LEVEL_FAILURE';

export const updateCharacterLevelRequest = (characterId, classId, level) => ({
  type: UPDATE_CHARACTER_LEVEL_REQUEST,
  payload: { characterId, classId, level },
});

export const updateCharacterLevelSuccess = (response) => ({
  type: UPDATE_CHARACTER_LEVEL_SUCCESS,
  payload: response,
});

export const updateCharacterLevelFailure = (error) => ({
  type: UPDATE_CHARACTER_LEVEL_FAILURE,
  payload: error,
});
