import createDataContext from '../context/createDataContext';
import trackerApi, {baseURL} from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'saveUser':
      return {...state, ...action.payload};
    default:
      return state;
  }
};

const saveUser = dispatch => user => {};

const updateUser = dispatch => async user => {};

export const {Provider, Context} = createDataContext(
  userReducer,
  {saveUser, updateUser},
  {pseudo: '', name: '', dateOfBirth: null, idProfilImage: ''},
);
