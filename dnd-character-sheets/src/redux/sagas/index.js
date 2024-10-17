import { all } from 'redux-saga/effects';
import { watchFetchClasses, watchAddClass } from './classSagas'; // Import the individual sagas

// Combine all sagas into a root saga
export default function* rootSaga() {
  yield all([
    watchFetchClasses(), // Starts the fetch classes saga
    watchAddClass(), // Starts the add class saga
    // Add other sagas here as your app grows
    // e.g., watchFetchCharacters(), watchCampaignActions(),
  ]);
}
