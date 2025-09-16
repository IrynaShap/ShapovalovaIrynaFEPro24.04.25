import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'redux-first-history';
import { types } from './modules/hotels/reducer';
import { fetchDestinations, fetchHotels } from '../api/client';

function* fetchDestinationsWorker() {
  try {
    const data = yield call(fetchDestinations);
    yield put({ type: types.FETCH_DESTINATIONS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.FETCH_DESTINATIONS_FAILURE, error: error.message || 'Failed to load destinations' });
  }
}

function* fetchHotelsWorker(action) {
  try {
    const allHotels = yield call(fetchHotels);
    const { destinationId } = action.payload || {};
    const filtered = destinationId ? allHotels.filter(h => String(h.city).toLowerCase() === String(destinationId).toLowerCase()) : allHotels;
    yield put({ type: types.FETCH_HOTELS_SUCCESS, payload: filtered });
    yield put(push('/hotels'));
  } catch (error) {
    yield put({ type: types.FETCH_HOTELS_FAILURE, error: error.message || 'Failed to fetch hotels' });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.FETCH_DESTINATIONS_REQUEST, fetchDestinationsWorker),
    takeLatest(types.FETCH_HOTELS_REQUEST, fetchHotelsWorker),
  ]);
}
