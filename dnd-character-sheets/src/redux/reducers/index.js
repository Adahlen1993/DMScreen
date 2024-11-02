import { combineReducers } from 'redux';
import classReducer from './classReducer'; // Import your specific reducer
import characterReducer from './characterReducer';
import characterPreferencesReducer from './characterPreferencesReducer';
import specificCharacterReducer from './specificCharacterReducer';

// Combine all reducers into a rootReducer
const rootReducer = combineReducers({
  classes: classReducer, // Manage the class-related state
  characters: characterReducer,
  preferences: characterPreferencesReducer,
  specificCharacter: specificCharacterReducer,

});

export default rootReducer;
