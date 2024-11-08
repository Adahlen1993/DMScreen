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

const apiAddCharacter = ({ userId }) => {
  const token = localStorage.getItem('token'); // Get token from localStorage

  if (!token) {
    throw new Error('Authorization token is missing.');
  }

  return fetch(`/api/characters/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Add Authorization header
    },
    body: JSON.stringify({ userId }), // Send userId only
  }).then((response) => response.json());
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

// API function to fetch character classes by character ID
const apiFetchCharacterClasses = (characterId) => {
  const token = localStorage.getItem('token');
  return fetch(`/api/characters/${characterId}/manage/class`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Add token to Authorization header
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch character classes');
    }
    return response.json();
  });
};

// Saga to handle fetching all characters
function* fetchCharactersSaga() {
  try {
    console.log('Fetching characters...');
    const response = yield call(apiFetchCharacters);
    console.log('Fetch Characters Response:', response); // Check the response structure

    if (response.characters) {
      yield put({ type: 'FETCH_CHARACTERS_SUCCESS', payload: response.characters });
    } else {
      yield put({ type: 'FETCH_CHARACTERS_FAILURE', payload: response.error });
    }
  } catch (error) {
    console.error('Error fetching characters:', error);
    yield put({ type: 'FETCH_CHARACTERS_FAILURE', payload: error.message });
  }
}

function* fetchCharacterClassesSaga(action) {
  try {
    const characterId = action.payload;
    const response = yield call(apiFetchCharacterClasses, characterId);
    console.log('Fetch Character Classes Response:', response); // Debugging log

    if (response.data) {
      yield put({ type: 'FETCH_CHARACTER_CLASSES_SUCCESS', payload: response.data });
    } else {
      yield put({ type: 'FETCH_CHARACTER_CLASSES_FAILURE', payload: response.error });
    }
  } catch (error) {
    console.error('Error fetching character classes:', error);
    yield put({ type: 'FETCH_CHARACTER_CLASSES_FAILURE', payload: error.message });
  }
}

// Saga to handle adding a new character
function* addCharacterSaga() {
  try {
    // Assuming userId is stored in localStorage
    const userId = localStorage.getItem("userId");
    if (!userId) {
      throw new Error("User ID not found in local storage");
    }

    // Call the API to add a character
    const response = yield call(apiAddCharacter, { userId });
    console.log("Add Character Response:", response); // Debugging log

    if (response.character) {
      yield put({ type: "ADD_CHARACTER_SUCCESS", payload: response.character });
    } else {
      yield put({ type: "ADD_CHARACTER_FAILURE", payload: response.error });
    }
  } catch (error) {
    console.error("Error adding character:", error);
    yield put({ type: "ADD_CHARACTER_FAILURE", payload: error.message });
  }
}
const apiFetchCharacterClassFeatures = (characterId, classId) => {
  const token = localStorage.getItem('token');
  return fetch(`/api/characters/features`, {
    method: 'POST', // Use POST to include both characterId and classId in the body
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Add token to Authorization header
    },
    body: JSON.stringify({ characterId, classId }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch character class features');
    }
    return response.json();
  });
};

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
function* fetchCharacterClassFeaturesSaga(action) {
  try {
    const { characterId, classId } = action.payload;
    const response = yield call(apiFetchCharacterClassFeatures, characterId, classId);
    console.log('Fetch Character Class Features Response:', response); // Debugging log

    if (response.data) {
      yield put({ type: 'FETCH_CHARACTER_CLASS_FEATURES_SUCCESS', payload: response.data });
    } else {
      yield put({ type: 'FETCH_CHARACTER_CLASS_FEATURES_FAILURE', payload: response.error });
    }
  } catch (error) {
    console.error('Error fetching character class features:', error);
    yield put({ type: 'FETCH_CHARACTER_CLASS_FEATURES_FAILURE', payload: error.message });
  }
}

// Watcher saga
export function* watchCharacterActions() {
  yield takeLatest('FETCH_CHARACTERS_REQUEST', fetchCharactersSaga);
  yield takeLatest('ADD_CHARACTER_REQUEST', addCharacterSaga);
  yield takeLatest('MANAGE_CHARACTER_REQUEST', manageCharacterSaga);
  yield takeLatest('FETCH_CHARACTER_CLASSES_REQUEST', fetchCharacterClassesSaga);
  yield takeLatest('FETCH_CHARACTER_CLASS_FEATURES_REQUEST', fetchCharacterClassFeaturesSaga); // Add this line
}
