const initialState = {
    characters: [],
    selectedCharacter: null,
    loading: false,
    error: null,
  };
  
  const characterReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_CHARACTERS_REQUEST':
      case 'ADD_CHARACTER_REQUEST':
      case 'MANAGE_CHARACTER_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'FETCH_CHARACTERS_SUCCESS':
        return {
          ...state,
          loading: false,
          characters: action.payload,
        };
      case 'ADD_CHARACTER_SUCCESS':
        return {
          ...state,
          loading: false,
          characters: [...state.characters, action.payload],
        };
      case 'MANAGE_CHARACTER_SUCCESS':
        return {
          ...state,
          loading: false,
          characters: state.characters.map((character) =>
            character.id === action.payload.id ? action.payload : character
          ),
        };
      case 'FETCH_CHARACTERS_FAILURE':
      case 'ADD_CHARACTER_FAILURE':
      case 'MANAGE_CHARACTER_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default characterReducer;
  