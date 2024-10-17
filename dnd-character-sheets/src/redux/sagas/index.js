import { all } from 'redux-saga/effects';
import { watchClassActions } from './classes';
import { watchCharacterActions } from './characters';

export default function* rootSaga() {
  yield all([
    watchClassActions(),
    watchCharacterActions(),
    // Add other watchers here as needed
  ]);
}
