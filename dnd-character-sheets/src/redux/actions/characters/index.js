// Actions for fetching all characters
export const fetchCharactersRequest = () => ({
    type: 'FETCH_CHARACTERS_REQUEST',
  });
  
  export const fetchCharactersSuccess = (characters) => ({
    type: 'FETCH_CHARACTERS_SUCCESS',
    payload: characters,
  });
  
  export const fetchCharactersFailure = (error) => ({
    type: 'FETCH_CHARACTERS_FAILURE',
    payload: error,
  });
  
  // Action for adding a new character
  export const addCharacterRequest = (characterData) => ({
    type: 'ADD_CHARACTER_REQUEST',
    payload: characterData,
  });
  
  export const addCharacterSuccess = (newCharacter) => ({
    type: 'ADD_CHARACTER_SUCCESS',
    payload: newCharacter,
  });
  
  export const addCharacterFailure = (error) => ({
    type: 'ADD_CHARACTER_FAILURE',
    payload: error,
  });
  
  // Action for managing a specific character
  export const manageCharacterRequest = (characterId, updateData) => ({
    type: 'MANAGE_CHARACTER_REQUEST',
    payload: { characterId, updateData },
  });
  
  export const manageCharacterSuccess = (updatedCharacter) => ({
    type: 'MANAGE_CHARACTER_SUCCESS',
    payload: updatedCharacter,
  });
  
  export const manageCharacterFailure = (error) => ({
    type: 'MANAGE_CHARACTER_FAILURE',
    payload: error,
  });
  