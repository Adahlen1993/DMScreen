// Actions for character preferences
export const fetchCharacterPreferencesRequest = (characterId) => ({
    type: 'FETCH_CHARACTER_PREFERENCES_REQUEST',
    payload: characterId,
  });
  
  export const fetchCharacterPreferencesSuccess = (preferences) => ({
    type: 'FETCH_CHARACTER_PREFERENCES_SUCCESS',
    payload: preferences,
  });
  
  export const fetchCharacterPreferencesFailure = (error) => ({
    type: 'FETCH_CHARACTER_PREFERENCES_FAILURE',
    payload: error,
  });
  
  export const saveCharacterPreferencesRequest = (preferences) => ({
    type: 'SAVE_CHARACTER_PREFERENCES_REQUEST',
    payload: preferences,
  });
  
  export const saveCharacterPreferencesSuccess = (preferences) => ({
    type: 'SAVE_CHARACTER_PREFERENCES_SUCCESS',
    payload: preferences,
  });
  
  export const saveCharacterPreferencesFailure = (error) => ({
    type: 'SAVE_CHARACTER_PREFERENCES_FAILURE',
    payload: error,
  });
  
  export const linkCharacterPreferencesRequest = (characterId, preferencesId) => ({
    type: 'LINK_CHARACTER_PREFERENCES_REQUEST',
    payload: { characterId, preferencesId },
  });
  
  export const linkCharacterPreferencesSuccess = () => ({
    type: 'LINK_CHARACTER_PREFERENCES_SUCCESS',
  });
  
  export const linkCharacterPreferencesFailure = (error) => ({
    type: 'LINK_CHARACTER_PREFERENCES_FAILURE',
    payload: error,
  });
  