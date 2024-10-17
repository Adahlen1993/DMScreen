import { call, put, takeLatest } from 'redux-saga/effects';

// Mock API call functions
const apiFetchCharacters = () => {
  const token = localStorage.getItem('token');
  return fetch(`/api/characters/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Add token to Authorization header
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Unauthorized');
    }
    return response.json();
  });
};

const apiAddCharacter = (characterData) => {
  const token = localStorage.getItem('token');
  return fetch(`/api/character/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Add token to Authorization header
    },
    body: JSON.stringify(characterData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Unauthorized');
    }
    return response.json();
  });
};

const apiManageCharacter = (characterId, updateData) => {
  const token = localStorage.getItem('token');
  return fetch(`/api/character/${characterId}/manage`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Add token to Authorization header
    },
    body: JSON.stringify(updateData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Unauthorized');
    }
    return response.json();
  });
};

// Saga to handle fetching all characters
function* fetchCharactersSaga() {
  try {
    const response = yield call(apiFetchCharacters);
    console.log('Fetch Characters Response:', response); // Debugging: Check the response structure

    if (response.success) {
      yield put({ type: 'FETCH_CHARACTERS_SUCCESS', payload: response.data });
    } else {
      yield put({ type: 'FETCH_CHARACTERS_FAILURE', payload: response.error });
    }
  } catch (error) {
    console.error('Error fetching characters:', error);
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
    console.error('Error adding character:', error);
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
    console.error('Error managing character:', error);
    yield put({ type: 'MANAGE_CHARACTER_FAILURE', payload: error.message });
  }
}

// Watcher saga
export function* watchCharacterActions() {
  yield takeLatest('FETCH_CHARACTERS_REQUEST', fetchCharactersSaga);
  yield takeLatest('ADD_CHARACTER_REQUEST', addCharacterSaga);
  yield takeLatest('MANAGE_CHARACTER_REQUEST', manageCharacterSaga);
}
