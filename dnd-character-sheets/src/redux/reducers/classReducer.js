const initialState = {
    availableClasses: [],
    selectedClass: null,
    characterClasses: [],
    classFeatures: {},
    selectedValues: {},
    showModal: false,
    showSubclassModal: false,
    availableSubclasses: [],
    selectedClassIndex: null,
    loading: false,
    error: null,
  };
  
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
      case 'SELECT_CLASS':
        return {
          ...state,
          selectedClass: action.payload,
          showModal: true,
        };
      case 'CLOSE_MODAL':
        return {
          ...state,
          showModal: false,
          selectedClass: null,
        };
      case 'ADD_CLASS_SUCCESS':
        return {
          ...state,
          characterClasses: [...state.characterClasses, action.payload],
          showModal: false,
        };
      case 'ADD_CLASS_FAILURE':
        return {
          ...state,
          error: action.payload,
        };
      case 'LEVEL_UP_CLASS_SUCCESS':
        return {
          ...state,
          characterClasses: state.characterClasses.map((classItem, index) =>
            index === action.payload.index
              ? { ...classItem, level: action.payload.newLevel }
              : classItem
          ),
        };
      case 'LEVEL_UP_CLASS_FAILURE':
        return {
          ...state,
          error: action.payload,
        };
      case 'UPDATE_FEATURE_SELECTION':
        const { featureId, selectedValue, optionIndex } = action.payload;
        const updatedSelectedValues = { ...state.selectedValues };
        if (!updatedSelectedValues[featureId]) {
          updatedSelectedValues[featureId] = [];
        }
        updatedSelectedValues[featureId][optionIndex] = selectedValue;
  
        return {
          ...state,
          selectedValues: updatedSelectedValues,
        };
      default:
        return state;
    }
  };
  
  export default classReducer;
  