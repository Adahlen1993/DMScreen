// Initial state for the classes
const initialState = {
  availableClasses: [],
  selectedClass: null,
  characterClasses: [],
  loading: false,
  error: null,
};

// Reducer function to manage classes state
const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CLASSES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_CLASSES_SUCCESS':
      return {
        ...state,
        loading: false,
        availableClasses: action.payload,
      };
    case 'FETCH_CLASSES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'FETCH_CLASS_BY_ID_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_CLASS_BY_ID_SUCCESS':
      return {
        ...state,
        loading: false,
        selectedClass: action.payload,
      };
    case 'FETCH_CLASS_BY_ID_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'ADD_CLASS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'ADD_CLASS_SUCCESS':
      return {
        ...state,
        loading: false,
        characterClasses: [...state.characterClasses, action.payload],
      };
    case 'ADD_CLASS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Export the reducer as default
export default classReducer;
