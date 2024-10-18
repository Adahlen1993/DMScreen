import { call, put, takeLatest } from 'redux-saga/effects';

const apiFetchPreferences = (characterId) => fetch(`/api/characters/create/preferences/${characterId}`).then((response) => response.json());
const apiSavePreferences = (preferences) => fetch(`/api/characters/create/preferences/${preferences.characterId}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(preferences),
}).then((response) => response.json());
const apiLinkPreferences = (characterId, preferencesId) => fetch(`/api/characters/${characterId}/manage/preferences/link`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ preferencesId }),
}).then((response) => response.json());

function* fetchPreferencesSaga(action) {
  try {
    const data = yield call(apiFetchPreferences, action.payload);
    yield put({ type: 'FETCH_CHARACTER_PREFERENCES_SUCCESS', payload: data });
  } catch (error) {
    yield put({ type: 'FETCH_CHARACTER_PREFERENCES_FAILURE', payload: error.message });
  }
}

function* savePreferencesSaga(action) {
  try {
    const data = yield call(apiSavePreferences, action.payload);
    yield put({ type: 'SAVE_CHARACTER_PREFERENCES_SUCCESS', payload: data });
    yield put({ type: 'LINK_CHARACTER_PREFERENCES_REQUEST', payload: { characterId: action.payload.characterId, preferencesId: data.character_preferences_id } });
  } catch (error) {
    yield put({ type: 'SAVE_CHARACTER_PREFERENCES_FAILURE', payload: error.message });
  }
}

function* linkPreferencesSaga(action) {
  try {
    yield call(apiLinkPreferences, action.payload.characterId, action.payload.preferencesId);
    yield put({ type: 'LINK_CHARACTER_PREFERENCES_SUCCESS' });
  } catch (error) {
    yield put({ type: 'LINK_CHARACTER_PREFERENCES_FAILURE', payload: error.message });
  }
}

export function* watchCharacterPreferencesActions() {
  yield takeLatest('FETCH_CHARACTER_PREFERENCES_REQUEST', fetchPreferencesSaga);
  yield takeLatest('SAVE_CHARACTER_PREFERENCES_REQUEST', savePreferencesSaga);
  yield takeLatest('LINK_CHARACTER_PREFERENCES_REQUEST', linkPreferencesSaga);
}