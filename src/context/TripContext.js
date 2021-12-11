import createDataContext from '../context/createDataContext';
import errorHandler from '../errorHandler';
import trackerApi from '../api/tracker';

const TripReducer = (state, action) => {
  switch (action.type) {
    case 'saveTripsList':
      return {...state, listTrips: action.payload, loading: false};
    case 'saveTrip':
      return {
        ...state,
        selectedTrip: state.listTrips.length,
        listTrips: [...state.listTrips, action.payload],
        errorMessage: '',
      };
    case 'selectTrip':
      return {...state, selectedTrip: action.payload};
    default:
      return state;
  }
};

const selectTrip = dispatch => index => {
  dispatch({type: 'selectTrip', payload: index});
};

const getTrips = dispatch => async () => {
  try {
    const resp = await trackerApi.get('/user/trips', {
      headers: {'content-type': 'application/x-www-form-urlencoded'},
    });
    dispatch({type: 'saveTripsList', payload: resp.data.trips});
  } catch (err) {
    console.log(err);
  }
};

const saveTrip = dispatch => async trip => {
  const params = new URLSearchParams();
  params.append('name', trip.name);
  params.append('defaultStartLoc', trip.defaultStartLoc);
  params.append('startDate', trip.startDate);
  try {
    const resp = await trackerApi.post('/user/trip', params, {
      headers: {'content-type': 'application/x-www-form-urlencoded'},
    });
    dispatch({type: 'saveTrip', payload: resp.data.trip});
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: errorHandler(err),
    });
  }
};

export const {Provider, Context} = createDataContext(
  TripReducer,
  {saveTrip, getTrips, selectTrip},
  {
    listTrips: [],
    selectedTrip: null,
    loading: true,
    errorMessage: '',
  },
);
