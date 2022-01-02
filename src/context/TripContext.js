import createDataContext from '../context/createDataContext';
import errorHandler from '../errorHandler';
import trackerApi from '../api/tracker';
import {goBack, navigate} from '../navigationRef';

const TripReducer = (state, action) => {
  switch (action.type) {
    case 'saveTripList':
      return {
        ...state,
        tripList: action.payload.tripList,
        loadingToPost: false,
        loadingToGet: false,
        selectedTrip: action.payload.selectedTrip,
      };
    case 'saveTrip':
      return {
        ...state,
        selectedTrip: 0,
        tripList: [action.payload, ...state.tripList],
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
    const tripList = [...resp.data.trips];
    dispatch({
      type: 'saveTripList',
      payload: {tripList: tripList, selectedTrip: null},
    });
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
    navigate('TravelDetail', 'TravelStack');
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

  try {
    const resp = await trackerApi.post(
      '/user/' + tripList[tripIndex]._id,
      params,
      {
        headers: {'content-type': 'application/x-www-form-urlencoded'},
      },
    );

    // Les voyages avant celui qui est modifié
    const editedTrip = tripList[tripIndex];
    editedTrip.places.push(resp.data.place);
    const newTripList = updateList(tripList, tripIndex, editedTrip);
    dispatch({
      type: 'saveTripList',
      payload: {tripList: newTripList, selectedTrip: tripIndex},
    });
    return 1;
  } catch (err) {
    console.log(err);
    console.log(err.response);
    dispatch({
      type: 'add_error',
      payload: errorHandler(err),
    });
    return 0;
  }
};

const startRouting = dispatch => async (tripList, tripIndex) => {
  try {
    const resp = await trackerApi.get(
      `/user/${tripList[tripIndex]._id}/routing`,
      {
        headers: {'content-type': 'application/x-www-form-urlencoded'},
      },
    );

    // Les voyages avant celui qui est modifié
    const editedTrip = tripList[tripIndex];
    editedTrip.days = resp.data.days;
    const newTripList = updateList(tripList, tripIndex, editedTrip);
    dispatch({
      type: 'saveTripList',
      payload: {tripList: newTripList, selectedTrip: tripIndex},
    });
  } catch (err) {
    console.log(err.response);
  }
};

const removeTrip = dispatch => async (tripList, tripIndex) => {
  try {
    const resp = await trackerApi.delete('/user/' + tripList[tripIndex]._id, {
      headers: {'content-type': 'application/x-www-form-urlencoded'},
    });
    console.log(resp);
    const newTripList = [...tripList];
    newTripList.splice(tripIndex, 1);

    navigate('SelectTravel', 'TravelStack');
    dispatch({
      type: 'saveTripList',
      payload: {tripList: newTripList, selectedTrip: null},
    });
  } catch (err) {
    console.log(err);
  }
};

const updateList = (tripList, tripIndex, editedTrip) => {
  // Les voyages avant celui qui est modifié

  let newTripList = tripList.slice(0, tripIndex);

  // Le voyage modifié
  newTripList.push(editedTrip);
  // Les voyages après celui qui est modifié
  const endOfList = tripList.slice(tripIndex + 1);
  if (endOfList.length > 0) newTripList = [...newTripList, ...endOfList];
  return newTripList;
};

export const {Provider, Context} = createDataContext(
  TripReducer,
  {
    saveTrip,
    getTrips,
    selectTrip,
    addPlaceToTrip,
    startLoading,
    startRouting,
    removeTrip,
  },
  {
    tripList: [],
    selectedTrip: null,
    loadingToGet: false,
    loadingToPost: false,
    errorMessage: '',
  },
);
