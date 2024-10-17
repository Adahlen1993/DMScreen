import { call, put, takeLatest } from 'redux-saga/effects';

// Mock API call functions
const apiFetchCharacters = () => {
  return fetch(`/api/characters/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};

const apiAddCharacter = (characterData) => {
  return fetch(`/api/character/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(characterData),
  }).then((response) => response.json());
};

const apiManageCharacter = (characterId, updateData) => {
  return fetch(`/api/character/${characterId}/manage`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  }).then((response) => response.json());
};

// Saga to handle fetching all characters
function* fetchCharactersSaga() {
  try {
    const response = yield call(apiFetchCharacters);
    if (response.success) {
      yield put({ type: 'FETCH_CHARACTERS_SUCCESS', payload: response.data });
    } else {
      yield put({ type: 'FETCH_CHARACTERS_FAILURE', payload: response.error });
    }
  } catch (error) {
    yield put({ type: 'FETCH_CHARACTERS_FAILURE', payload: error.message });
  }
}

// Saga to handle adding a new character
function* addCharacterSaga(action) {
  try {
    const characterData = action.payload;
    const response = yield call(apiAddCharacter, characterData);
    if (response.success) {
      yield put({ type: 'ADD_CHARACTER_SUCCESS', payload: response.data });
    } else {
      yield put({ type: 'ADD_CHARACTER_FAILURE', payload: response.error });
    }
  } catch (error) {
    yield put({ type: 'ADD_CHARACTER_FAILURE', payload: error.message });
  }
}

// Saga to handle managing a specific character
function* manageCharacterSaga(action) {
  try {
    const { characterId, updateData } = action.payload;
    const response = yield call(apiManageCharacter, characterId, updateData);
    if (response.success) {
      yield put({ type: 'MANAGE_CHARACTER_SUCCESS', payload: response.data });
    } else {
      yield put({ type: 'MANAGE_CHARACTER_FAILURE', payload: response.error });
    }
  } catch (error) {
    yield put({ type: 'MANAGE_CHARACTER_FAILURE', payload: error.message });
  }
}

// Watcher saga
export function* watchCharacterActions() {
  yield takeLatest('FETCH_CHARACTERS_REQUEST', fetchCharactersSaga);
  yield takeLatest('ADD_CHARACTER_REQUEST', addCharacterSaga);
  yield takeLatest('MANAGE_CHARACTER_REQUEST', manageCharacterSaga);
}
