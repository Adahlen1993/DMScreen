import { combineReducers } from 'redux';
import classReducer from './classReducer'; // Import your specific reducer
import characterReducer from './characterReducer';
import characterPreferencesReducer from './characterPreferencesReducer';

// Combine all reducers into a rootReducer
const rootReducer = combineReducers({
  classes: classReducer, // Manage the class-related state
  characters: characterReducer,
  preferences: characterPreferencesReducer,

});

export default rootReducer;
