import { all } from 'redux-saga/effects';
import { watchClassActions } from './classSagas';
import { watchCharacterActions } from './charactersSagas';

export default function* rootSaga() {
  yield all([
    watchClassActions(),
    watchCharacterActions(),
    // Add other watchers here as needed
  ]);
}
