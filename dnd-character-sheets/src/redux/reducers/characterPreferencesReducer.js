const initialState = {
    preferences: {},
    loading: {
      fetch: false,
      save: false,
      link: false,
    },
    error: null,
  };
  
  const characterPreferencesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_CHARACTER_PREFERENCES_REQUEST':
        return { ...state, loading: { ...state.loading, fetch: true }, error: null };
      case 'SAVE_CHARACTER_PREFERENCES_REQUEST':
        return { ...state, loading: { ...state.loading, save: true }, error: null };
      case 'LINK_CHARACTER_PREFERENCES_REQUEST':
        return { ...state, loading: { ...state.loading, link: true }, error: null };
  
      case 'FETCH_CHARACTER_PREFERENCES_SUCCESS':
        return { ...state, preferences: action.payload, loading: { ...state.loading, fetch: false } };
      case 'SAVE_CHARACTER_PREFERENCES_SUCCESS':
        return { ...state, loading: { ...state.loading, save: false } };
      case 'LINK_CHARACTER_PREFERENCES_SUCCESS':
        return { ...state, loading: { ...state.loading, link: false } };
  
      case 'FETCH_CHARACTER_PREFERENCES_FAILURE':
        return { ...state, loading: { ...state.loading, fetch: false }, error: action.payload };
      case 'SAVE_CHARACTER_PREFERENCES_FAILURE':
        return { ...state, loading: { ...state.loading, save: false }, error: action.payload };
      case 'LINK_CHARACTER_PREFERENCES_FAILURE':
        return { ...state, loading: { ...state.loading, link: false }, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default characterPreferencesReducer;
  