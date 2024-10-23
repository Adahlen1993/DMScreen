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
  return fetch(`/api/character/${characterId}/manage/class`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ classId: selectedClass.id, level: 1 }),
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
function* addClassSaga(action) {
  try {
    const { characterId, selectedClass } = action.payload;
    const response = yield call(apiAddClass, characterId, selectedClass);
    if (response.success) {
      yield put({ type: 'ADD_CLASS_SUCCESS', payload: { ...selectedClass, level: 1 } });
      // Assume these actions are dispatched to add class features and proficiencies later
    } else {
      yield put({ type: 'ADD_CLASS_FAILURE', payload: response.error });
    }
  } catch (error) {
    yield put({ type: 'ADD_CLASS_FAILURE', payload: error.message });
  }
}

// Watcher saga
export function* watchClassActions() {
  yield takeLatest('FETCH_CLASSES_REQUEST', fetchClassesSaga);
  yield takeLatest('FETCH_CLASS_BY_ID_REQUEST', fetchClassByIdSaga);
  yield takeLatest('ADD_CLASS_REQUEST', addClassSaga);
}
