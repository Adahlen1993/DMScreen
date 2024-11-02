import { all } from 'redux-saga/effects';
import { watchClassActions } from './classSagas';
import { watchCharacterActions } from './charactersSagas';
import { watchCharacterPreferencesActions } from './characterPreferencesSagas';
import { watchSpecificCharacterActions } from './specificCharacterSagas';

export default function* rootSaga() {
  yield all([
    watchClassActions(),
    watchCharacterActions(),
    watchCharacterPreferencesActions(),
    watchSpecificCharacterActions(),
    // Add other watchers here as needed
  ]);
}
