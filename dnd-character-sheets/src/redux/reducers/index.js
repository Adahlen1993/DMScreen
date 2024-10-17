import { combineReducers } from 'redux';
import classReducer from './classReducer'; // Import your specific reducer

// Combine all reducers into a rootReducer
const rootReducer = combineReducers({
  classes: classReducer, // Manage the class-related state
  // You can add more reducers here as your app grows
  // e.g., characters: characterReducer,
  // campaigns: campaignReducer,
});

export default rootReducer;
