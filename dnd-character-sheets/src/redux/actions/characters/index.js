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

// Actions for creating a new character
export const createCharacterRequest = () => ({
  type: 'CREATE_CHARACTER_REQUEST',
});

export const createCharacterSuccess = (newCharacter) => ({
  type: 'CREATE_CHARACTER_SUCCESS',
  payload: newCharacter,
});

export const createCharacterFailure = (error) => ({
  type: 'CREATE_CHARACTER_FAILURE',
  payload: error,
});

// Actions for managing a specific character
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
