import { call, put, takeLatest } from 'redux-saga/effects';

// Fetch classes worker saga
function* fetchClasses(action) {
  try {
    const response = yield call(fetch, `/api/characters/create/class/${action.payload}`);
    const data = yield response.json();
    yield put({ type: 'FETCH_CLASSES_SUCCESS', payload: data });
  } catch (error) {
    yield put({ type: 'FETCH_CLASSES_FAILURE', payload: error.message });
  }
}

// Add class worker saga
function* addClass(action) {
  try {
    const { characterId, selectedClass } = action.payload;
    const response = yield call(fetch, `/api/characters/create/class/${characterId}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ classId: selectedClass.id, level: 1 }),
    });
    const data = yield response.json();
    if (data.success) {
      yield put({ type: 'ADD_CLASS_SUCCESS', payload: { ...selectedClass, level: 1 } });
    }
  } catch (error) {
    yield put({ type: 'ADD_CLASS_FAILURE', payload: error.message });
  }
}

// Level up class worker saga
function* levelUpClass(action) {
  try {
    const { characterId, classItem, index } = action.payload;
    const newLevel = classItem.level + 1;
    const response = yield call(fetch, `/api/characters/create/class/${characterId}/level-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ classId: classItem.id, newLevel }),
    });
    const data = yield response.json();
    if (data.success) {
      yield put({ type: 'LEVEL_UP_CLASS_SUCCESS', payload: { index, newLevel } });
    }
  } catch (error) {
    yield put({ type: 'LEVEL_UP_CLASS_FAILURE', payload: error.message });
  }
}

// Watcher sagas
export function* watchFetchClasses() {
  yield takeLatest('FETCH_CLASSES_REQUEST', fetchClasses);
}

export function* watchAddClass() {
  yield takeLatest('ADD_CLASS_REQUEST', addClass);
}

export function* watchLevelUpClass() {
  yield takeLatest('LEVEL_UP_CLASS_REQUEST', levelUpClass);
}
