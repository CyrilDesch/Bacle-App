import createDataContext from '../context/createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserRequest, signInRequest, signUpRequest} from '../api/userRequest';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signup':
      return {...state, token: action.payload, error: ''};
    case 'signin':
      return {
        ...state,
        token: action.payload.token,
        error: '',
        localLoading: action.payload.localLoading,
      };
    case 'signout':
      return {...state, token: null, loading: false};
    case 'add_error':
      return {...state, error: action.payload};
    case 'remove_error':
      return {...state, error: ''};
    case 'stop_local_loading':
      return {...state, localLoading: false};
    default:
      return state;
  }
};

const addError =
  dispatch =>
  ({error}) => {
    dispatch({type: 'add_error', payload: error});
  };

const removeError = dispatch => () => {
  dispatch({type: 'remove_error'});
};

const signup =
  dispatch =>
  async ({email, password, lastName, firstName, saveUser}) => {
    try {
      await signUpRequest(email, password, firstName, lastName);

      const token = await signInRequest(email, password);
      await AsyncStorage.setItem('token', token);

      const user = await getUserRequest();
      saveUser();

      dispatch({type: 'signup', payload: token});
    } catch (err) {
      console.log(err);
      console.log(err.response);
      dispatch({type: 'add_error', payload: err});
    }
  };

const signin =
  dispatch =>
  async ({email, password, saveUser}) => {
    try {
      const token = await signInRequest(email, password);
      await AsyncStorage.setItem('token', token);

      const user = await getUserRequest();
      saveUser();

      dispatch({
        type: 'signin',
        payload: {token: token, localLoading: false},
      });
    } catch (err) {
      dispatch({type: 'add_error', payload: err});
    }
  };

const tryLocalSignIn =
  dispatch =>
  async ({saveUser}) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      try {
        const user = await getUserRequest();
        saveUser();
        dispatch({
          type: 'signin',
          payload: {token: token, localLoading: false},
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatch({type: 'stop_local_loading'});
    }
  };

const signout = dispatch => async () => {
  try {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'signout'});
  } catch (err) {
    console.log(err);
  }
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signup, signout, removeError, addError, tryLocalSignIn},
  {token: null, error: '', localLoading: true},
);
