import { all } from 'redux-saga/effects';
import { watchClassActions } from './classSagas';
import { watchCharacterActions } from './charactersSagas';
import { watchCharacterPreferencesActions } from './characterPreferencesSagas';

export default function* rootSaga() {
  yield all([
    watchClassActions(),
    watchCharacterActions(),
    watchCharacterPreferencesActions(),
    // Add other watchers here as needed
  ]);
}
