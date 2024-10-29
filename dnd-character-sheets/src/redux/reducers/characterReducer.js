const initialState = {
  characters: [],
  characterClasses: [], // Add character classes here
  loading: false,
  error: null,
  newCharacter: null,
};

const characterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CHARACTERS_REQUEST':
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
    case 'FETCH_CHARACTERS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'ADD_CHARACTER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'ADD_CHARACTER_SUCCESS':
      return {
        ...state,
        loading: false,
        newCharacter: action.payload,
      };
    case 'ADD_CHARACTER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'CLEAR_NEW_CHARACTER':
      return {
        ...state,
        newCharacter: null,
      };
    default:
      return state;
      case 'FETCH_CHARACTER_CLASSES_REQUEST':
  return {
    ...state,
    loading: true,
    error: null,
  };
case 'FETCH_CHARACTER_CLASSES_SUCCESS':
  return {
    ...state,
    loading: false,
    characterClasses: action.payload,
  };
case 'FETCH_CHARACTER_CLASSES_FAILURE':
  return {
    ...state,
    loading: false,
    error: action.payload,
  };

  }
};

export default characterReducer;
