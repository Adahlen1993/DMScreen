const initialState = {
  characters: [],
  characterClasses: [],
  classFeatures: {}, // Add class features here
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
    case 'FETCH_CHARACTER_CLASS_FEATURES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_CHARACTER_CLASS_FEATURES_SUCCESS':
      return {
        ...state,
        loading: false,
        classFeatures: {
          ...state.classFeatures,
          [`class-${action.payload.classId}`]: action.payload.features, // Store features by class ID
        },
      };
    case 'FETCH_CHARACTER_CLASS_FEATURES_FAILURE':
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
