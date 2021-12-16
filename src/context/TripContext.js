import createDataContext from '../context/createDataContext';
import errorHandler from '../errorHandler';
import trackerApi from '../api/tracker';
import {goBack, navigate} from '../navigationRef';

const TripReducer = (state, action) => {
  switch (action.type) {
    case 'saveTripList':
      return {
        ...state,
        tripList: action.payload,
        loadingToPost: false,
        loadingToGet: false,
      };
    case 'saveTrip':
      return {
        ...state,
        selectedTrip: state.tripList.length,
        tripList: [...state.tripList, action.payload],
        errorMessage: '',
        loadingToPost: false,
        loadingToGet: false,
      };
    case 'selectTrip':
      return {...state, selectedTrip: action.payload};
    case 'start_loading':
      return {...state, loadingToPost: true, loadingToGet: true};
    case 'add_error':
      return {
        ...state,
        errorMessage: action.payload,
        loadingToPost: false,
        loadingToGet: false,
      };
    case 'remove_error':
      return {...state, errorMessage: ''};
    default:
      return state;
  }
};

const startLoading = dispatch => () => {
  dispatch({type: 'start_loading'});
};

const selectTrip = dispatch => index => {
  dispatch({type: 'selectTrip', payload: index});
};

const getTrips = dispatch => async () => {
  try {
    const resp = await trackerApi.get('/user/trips', {
      headers: {'content-type': 'application/x-www-form-urlencoded'},
    });
    const tripList = [...resp.data.trips].reverse();
    dispatch({type: 'saveTripList', payload: tripList});
  } catch (err) {
    console.log(err);
  }
};

const saveTrip = dispatch => async trip => {
  const params = new URLSearchParams();
  params.append('name', trip.name);
  params.append('defaultStartLat', trip.defaultStartLoc.lat);
  params.append('defaultStartLon', trip.defaultStartLoc.lon);
  params.append('startDate', trip.startDate);
  try {
    const resp = await trackerApi.post('/user/trip', params, {
      headers: {'content-type': 'application/x-www-form-urlencoded'},
    });
    dispatch({type: 'saveTrip', payload: resp.data.trip});
    navigate('TravelDetail');
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: 'add_error',
      payload: errorHandler(err),
    });
  }
};

const addPlaceToTrip = dispatch => async (tripList, tripIndex, place) => {
  const params = new URLSearchParams();
  params.append('name', place.name);
  params.append('notes', place.notes);
  params.append('lat', place.lat);
  params.append('lon', place.lon);
  params.append('displayAddress', place.displayAddress);

  // Les voyages avant celui qui est modifié
  const newTripList = tripList.slice(0, tripIndex);

  // Le voyage modifié
  const editedTrip = tripList[tripIndex];
  editedTrip.places.push(place);
  newTripList.push(editedTrip);

  // Les voyages après celui qui est modifié
  newTripList.push(tripList.slice(tripIndex + 1));

  try {
    const resp = await trackerApi.post(
      '/user/' + tripList[tripIndex]._id,
      params,
      {
        headers: {'content-type': 'application/x-www-form-urlencoded'},
      },
    );
    dispatch({type: 'saveTripList', payload: resp.data.place});
    return 1;
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: errorHandler(err),
    });

    return -1;
  }
};

const removeError = () => {};

export const {Provider, Context} = createDataContext(
  TripReducer,
  {saveTrip, getTrips, selectTrip, addPlaceToTrip, removeError, startLoading},
  {
    tripList: [],
    selectedTrip: null,
    loadingToGet: false,
    loadingToPost: false,
    errorMessage: '',
  },
);
