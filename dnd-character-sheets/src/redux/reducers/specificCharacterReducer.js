const initialSpecificCharacterState = {
    character: { character_id: null },
    characterClasses: [],
    classFeatures: [],
    loading: false,
    error: null,
  };
  
  const specificCharacterReducer = (state = initialSpecificCharacterState, action) => {
    switch (action.type) {
      case 'FETCH_SPECIFIC_CHARACTER_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'FETCH_SPECIFIC_CHARACTER_SUCCESS':
        return {
          ...state,
          loading: false,
          character: action.payload,
        };
      case 'FETCH_SPECIFIC_CHARACTER_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case 'FETCH_SPECIFIC_CHARACTER_CLASSES_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'FETCH_SPECIFIC_CHARACTER_CLASSES_SUCCESS':
        return {
          ...state,
          loading: false,
          characterClasses: action.payload,
        };
      case 'FETCH_SPECIFIC_CHARACTER_CLASSES_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case 'FETCH_SPECIFIC_CHARACTER_CLASS_FEATURES_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'FETCH_SPECIFIC_CHARACTER_CLASS_FEATURES_SUCCESS':
        return {
          ...state,
          loading: false,
          classFeatures: action.payload.features,
        };
      case 'FETCH_SPECIFIC_CHARACTER_CLASS_FEATURES_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case 'UPDATE_CHARACTER_CLASS_LEVEL_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'UPDATE_CHARACTER_CLASS_LEVEL_SUCCESS':
        return {
          ...state,
          loading: false,
          characterClasses: state.characterClasses.map((characterClass) =>
            characterClass.id === action.payload.id ? action.payload : characterClass
          ),
        };
      case 'UPDATE_CHARACTER_CLASS_LEVEL_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default specificCharacterReducer;
  