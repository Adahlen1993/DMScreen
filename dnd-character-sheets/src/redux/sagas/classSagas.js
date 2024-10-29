import { call, put, takeLatest } from 'redux-saga/effects';

// API functions
const apiFetchClasses = () => {
  return fetch(`/api/classes/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};

const apiFetchClassById = (classId) => {
  return fetch(`/api/classes/${classId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};

const apiAddClass = (characterId, selectedClass) => {
  return fetch(`/api/characters/${characterId}/manage/class/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ classId: selectedClass.id, level: 1 }),
  }).then((response) => response.json());
};

// API function to add character class features
const apiAddCharacterClassFeatures = (characterId, classId) => {
  return fetch(`/api/character/${characterId}/class/${classId}/features`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};

// API function to add character proficiencies
const apiAddCharacterProficiencies = (characterId, classId) => {
  return fetch(`/api/character/${characterId}/class/${classId}/proficiencies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};


function* fetchClassesSaga() {
  try {
    const response = yield call(apiFetchClasses);
    console.log('Fetched Classes Response:', response); // Log the response
    
    // Check if response is an array (indicating it contains the classes)
    if (Array.isArray(response)) {
      yield put({ type: 'FETCH_CLASSES_SUCCESS', payload: response });
    } else {
      yield put({ type: 'FETCH_CLASSES_FAILURE', payload: 'Invalid response format' });
    }
  } catch (error) {
    yield put({ type: 'FETCH_CLASSES_FAILURE', payload: error.message });
  }
}


// Saga to handle fetching a specific class by ID
function* fetchClassByIdSaga(action) {
  try {
    const classId = action.payload;
    const response = yield call(apiFetchClassById, classId);
    if (response.success) {
      yield put({ type: 'FETCH_CLASS_BY_ID_SUCCESS', payload: response.data });
    } else {
      yield put({ type: 'FETCH_CLASS_BY_ID_FAILURE', payload: response.error });
    }
  } catch (error) {
    yield put({ type: 'FETCH_CLASS_BY_ID_FAILURE', payload: error.message });
  }
}

// Saga to handle adding class to character
// Saga to handle adding class to character
function* addClassSaga(action) {
  try {
    const { characterId, selectedClass } = action.payload;
    const response = yield call(apiAddClass, characterId, selectedClass);
    if (response.success) {
      yield put({ type: 'ADD_CLASS_SUCCESS', payload: { ...selectedClass, level: 1 } });
      
      // Dispatch actions to add class features and proficiencies
      yield put({ type: 'ADD_CHARACTER_CLASS_FEATURES_REQUEST', payload: { characterId, classId: selectedClass.id } });
      yield put({ type: 'ADD_CHARACTER_PROFICIENCIES_REQUEST', payload: { characterId, classId: selectedClass.id } });

    } else {
      yield put({ type: 'ADD_CLASS_FAILURE', payload: response.error });
    }
  } catch (error) {
    yield put({ type: 'ADD_CLASS_FAILURE', payload: error.message });
  }
}

// Saga to handle adding class features to character
function* addCharacterClassFeaturesSaga(action) {
  try {
    const { characterId, classId } = action.payload;
    const response = yield call(apiAddCharacterClassFeatures, characterId, classId);
    if (response.success) {
      yield put({ type: 'ADD_CHARACTER_CLASS_FEATURES_SUCCESS', payload: response.data });
    } else {
      yield put({ type: 'ADD_CHARACTER_CLASS_FEATURES_FAILURE', payload: response.error });
    }
  } catch (error) {
    yield put({ type: 'ADD_CHARACTER_CLASS_FEATURES_FAILURE', payload: error.message });
  }
}

// Saga to handle adding proficiencies to character
function* addCharacterProficienciesSaga(action) {
  try {
    const { characterId, classId } = action.payload;
    const response = yield call(apiAddCharacterProficiencies, characterId, classId);
    if (response.success) {
      yield put({ type: 'ADD_CHARACTER_PROFICIENCIES_SUCCESS', payload: response.data });
    } else {
      yield put({ type: 'ADD_CHARACTER_PROFICIENCIES_FAILURE', payload: response.error });
    }
  } catch (error) {
    yield put({ type: 'ADD_CHARACTER_PROFICIENCIES_FAILURE', payload: error.message });
  }
}

// Watcher saga
export function* watchClassActions() {
  yield takeLatest('FETCH_CLASSES_REQUEST', fetchClassesSaga);
  yield takeLatest('FETCH_CLASS_BY_ID_REQUEST', fetchClassByIdSaga);
  yield takeLatest('ADD_CLASS_REQUEST', addClassSaga);
  yield takeLatest('ADD_CHARACTER_CLASS_FEATURES_REQUEST', addCharacterClassFeaturesSaga);
  yield takeLatest('ADD_CHARACTER_PROFICIENCIES_REQUEST', addCharacterProficienciesSaga);
}



