const initialState = {
  list: [],
  loading: false,
  error: null,
  destinations: [],
  lastSearch: {},
};

export const types = {
  FETCH_DESTINATIONS_REQUEST: 'hotels/FETCH_DESTINATIONS_REQUEST',
  FETCH_DESTINATIONS_SUCCESS: 'hotels/FETCH_DESTINATIONS_SUCCESS',
  FETCH_DESTINATIONS_FAILURE: 'hotels/FETCH_DESTINATIONS_FAILURE',

  FETCH_HOTELS_REQUEST: 'hotels/FETCH_HOTELS_REQUEST',
  FETCH_HOTELS_SUCCESS: 'hotels/FETCH_HOTELS_SUCCESS',
  FETCH_HOTELS_FAILURE: 'hotels/FETCH_HOTELS_FAILURE',
};

export function hotelsReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_DESTINATIONS_REQUEST:
      return { ...state, loading: true, error: null };
    case types.FETCH_HOTELS_REQUEST:
      return { ...state, loading: true, error: null, lastSearch: action.payload || {} };
    case types.FETCH_DESTINATIONS_SUCCESS:
      return { ...state, loading: false, destinations: action.payload };
    case types.FETCH_HOTELS_SUCCESS:
      return { ...state, loading: false, list: action.payload };
    case types.FETCH_DESTINATIONS_FAILURE:
    case types.FETCH_HOTELS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

export const actions = {
  fetchDestinations: () => ({ type: types.FETCH_DESTINATIONS_REQUEST }),
  fetchHotels: (payload) => ({ type: types.FETCH_HOTELS_REQUEST, payload }),
};


