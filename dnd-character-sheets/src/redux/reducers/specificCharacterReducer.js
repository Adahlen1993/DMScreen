const initialSpecificCharacterState = {
  character: { character_id: null },
  characterClasses: [],
  classFeatures: [],
  proficiencies: [],
  loading: false,
  loadingClasses: false,
  loadingFeatures: false,
  loadingProficiencies: false,
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
        loadingClasses: true,
        error: null,
      };
    case 'FETCH_SPECIFIC_CHARACTER_CLASSES_SUCCESS':
      return {
        ...state,
        loadingClasses: false,
        characterClasses: action.payload,
      };
    case 'FETCH_SPECIFIC_CHARACTER_CLASSES_FAILURE':
      return {
        ...state,
        loadingClasses: false,
        error: action.payload,
      };
    case 'FETCH_SPECIFIC_CHARACTER_CLASS_FEATURES_REQUEST':
      return {
        ...state,
        loadingFeatures: true,
        error: null,
      };
    case 'FETCH_SPECIFIC_CHARACTER_CLASS_FEATURES_SUCCESS':
      return {
        ...state,
        loadingFeatures: false,
        classFeatures: action.payload.features,
      };
    case 'FETCH_SPECIFIC_CHARACTER_CLASS_FEATURES_FAILURE':
      return {
        ...state,
        loadingFeatures: false,
        error: action.payload,
      };
    case 'UPDATE_CHARACTER_CLASS_LEVEL_REQUEST':
      return {
        ...state,
        loadingClasses: true,
        error: null,
      };
    case 'UPDATE_CHARACTER_CLASS_LEVEL_SUCCESS':
      return {
        ...state,
        loadingClasses: false,
        characterClasses: state.characterClasses.map((characterClass) =>
          characterClass.id === action.payload.id ? action.payload : characterClass
        ),
      };
    case 'UPDATE_CHARACTER_CLASS_LEVEL_FAILURE':
      return {
        ...state,
        loadingClasses: false,
        error: action.payload,
      };
    case 'SAVE_CHARACTER_PROFICIENCY_REQUEST':
      return {
        ...state,
        loadingProficiencies: true,
        error: null,
      };
    case 'SAVE_CHARACTER_PROFICIENCY_SUCCESS':
      return {
        ...state,
        loadingProficiencies: false,
        proficiencies: [
          ...state.proficiencies,
          ...action.payload.proficiencies.map((prof) => ({
            ...prof,
            label: action.payload.label,
          })),
        ],
      };
    case 'SAVE_CHARACTER_PROFICIENCY_FAILURE':
      return {
        ...state,
        loadingProficiencies: false,
        error: action.payload,
      };
    case 'UPDATE_CHARACTER_PROFICIENCY_REQUEST':
      return {
        ...state,
        loadingProficiencies: true,
        error: null,
      };
    case 'UPDATE_CHARACTER_PROFICIENCY_SUCCESS':
      return {
        ...state,
        loadingProficiencies: false,
        proficiencies: action.payload.proficiencies.map((prof) => ({
          ...prof,
          label: action.payload.label,
        })),
      };
    case 'UPDATE_CHARACTER_PROFICIENCY_FAILURE':
      return {
        ...state,
        loadingProficiencies: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default specificCharacterReducer;
