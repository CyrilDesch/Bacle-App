import createDataContext from '../context/createDataContext';
import errorHandler from '../errorHandler';
import trackerApi from '../api/tracker';

const TripReducer = (state, action) => {
  switch (action.type) {
    case 'saveTripList':
      return {...state, tripList: action.payload, loading: false};

    case 'saveTrip':
      return {
        ...state,
        selectedTrip: state.tripList.length,
        tripList: [...state.tripList, action.payload],
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
    dispatch({type: 'saveTripList', payload: resp.data.trips});
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
    dispatch({type: 'saveTripList', payload: newTripList});

    return 1;
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: errorHandler(err),
    });

    return -1;
  }
};

export const {Provider, Context} = createDataContext(
  TripReducer,
  {saveTrip, getTrips, selectTrip, addPlaceToTrip},
  {
    tripList: [],
    selectedTrip: null,
    loading: true,
    errorMessage: '',
  },
);
