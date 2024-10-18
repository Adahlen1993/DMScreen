const initialState = {
    preferences: {},
    loading: false,
    error: null,
  };
  
  const characterPreferencesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_CHARACTER_PREFERENCES_REQUEST':
      case 'SAVE_CHARACTER_PREFERENCES_REQUEST':
      case 'LINK_CHARACTER_PREFERENCES_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_CHARACTER_PREFERENCES_SUCCESS':
        return { ...state, preferences: action.payload, loading: false };
      case 'SAVE_CHARACTER_PREFERENCES_SUCCESS':
      case 'LINK_CHARACTER_PREFERENCES_SUCCESS':
        return { ...state, loading: false };
      case 'FETCH_CHARACTER_PREFERENCES_FAILURE':
      case 'SAVE_CHARACTER_PREFERENCES_FAILURE':
      case 'LINK_CHARACTER_PREFERENCES_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default characterPreferencesReducer;
  