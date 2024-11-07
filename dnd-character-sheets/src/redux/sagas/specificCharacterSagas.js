import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchSpecificCharacterSuccess,
  fetchSpecificCharacterFailure,
  fetchSpecificCharacterClassesSuccess,
  fetchSpecificCharacterClassesFailure,
  fetchSpecificCharacterClassFeaturesSuccess,
  fetchSpecificCharacterClassFeaturesFailure,
  updateCharacterClassLevelSuccess,
  updateCharacterClassLevelFailure,
  fetchSpecificCharacterClassFeaturesRequest,
} from '../actions/characters/class/specific/index'; // Update import path as needed

// Mock API calls
const apiFetchSpecificCharacter = async (characterId) => {
  const response = await fetch(`/api/characters/${characterId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch specific character');
  }
  return response.json();
};

const apiFetchSpecificCharacterClasses = async (characterId) => {
  const response = await fetch(`/api/characters/${characterId}/manage/class`);
  if (!response.ok) {
    throw new Error('Failed to fetch specific character classes');
  }
  return response.json();
};

const apiFetchSpecificCharacterClassFeatures = async (characterId, classId) => {
  const response = await fetch(`/api/characters/${characterId}/manage/class/features?classId=${classId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch specific character class features');
  }
  return response.json();
};

const apiUpdateCharacterClassLevel = async (characterId, classId, newLevel) => {
  const response = await fetch(`/api/characters/${characterId}/manage/class/level`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ classId, level: newLevel }),
  });
  if (!response.ok) {
    throw new Error('Failed to update character class level');
  }
  return response.json();
};


// Saga for fetching a specific character
function* fetchSpecificCharacterSaga(action) {
  try {
    const character = yield call(apiFetchSpecificCharacter, action.payload);
    yield put(fetchSpecificCharacterSuccess(character));
  } catch (error) {
    yield put(fetchSpecificCharacterFailure(error.message));
  }
}

// Saga for fetching specific character classes
function* fetchSpecificCharacterClassesSaga(action) {
  try {
    const characterClasses = yield call(apiFetchSpecificCharacterClasses, action.payload);
    yield put(fetchSpecificCharacterClassesSuccess(characterClasses));
  } catch (error) {
    yield put(fetchSpecificCharacterClassesFailure(error.message));
  }
}

// Saga for fetching specific character class features
function* fetchSpecificCharacterClassFeaturesSaga(action) {
  try {
    const { characterId, classId } = action.payload;
    const features = yield call(apiFetchSpecificCharacterClassFeatures, characterId, classId);
    yield put(fetchSpecificCharacterClassFeaturesSuccess(classId, features));
  } catch (error) {
    yield put(fetchSpecificCharacterClassFeaturesFailure(error.message));
  }
}

// Saga for updating character class level
function* updateCharacterClassLevelSaga(action) {
  try {
    const { characterId, classId, newLevel } = action.payload;
    const updatedClass = yield call(apiUpdateCharacterClassLevel, characterId, classId, newLevel);
    yield put(updateCharacterClassLevelSuccess(updatedClass));
    // Fetch updated class features based on new level
    yield put(fetchSpecificCharacterClassFeaturesRequest({ characterId, classId }));
  } catch (error) {
    yield put(updateCharacterClassLevelFailure(error.message));
  }
}

// Watcher saga
export function* watchSpecificCharacterActions() {
  yield takeLatest('FETCH_SPECIFIC_CHARACTER_REQUEST', fetchSpecificCharacterSaga);
  yield takeLatest('FETCH_SPECIFIC_CHARACTER_CLASSES_REQUEST', fetchSpecificCharacterClassesSaga);
  yield takeLatest('FETCH_SPECIFIC_CHARACTER_CLASS_FEATURES_REQUEST', fetchSpecificCharacterClassFeaturesSaga);
  yield takeLatest('UPDATE_CHARACTER_CLASS_LEVEL_REQUEST', updateCharacterClassLevelSaga);
}
