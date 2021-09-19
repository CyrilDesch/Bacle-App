import createDataContext from '../context/createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as navigation from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signup':
      return {...state, token: action.payload, error: '', loading: true};
    case 'signin':
      return {
        ...state,
        token: action.payload.token,
        error: '',
        loading: true,
        localLoading: action.payload.localLoading,
      };
    case 'signout':
      return {...state, token: null, loading: true};
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

const removeError = dispatch => () => {
  dispatch({type: 'remove_error'});
};

const signup =
  dispatch =>
  async ({email, password, saveUser}) => {
    try {
      /// MOCK DATA (a remplacer par requete)
      const user = require('../../customData.json').user;
      ///
      await AsyncStorage.setItem('token', user.simulToken);
      saveUser(user);
      dispatch({type: 'signup', payload: user.simulToken});
    } catch (err) {
      dispatch({type: 'add_error', payload: 'Une erreur est survenue'});
    }
  };

const signin =
  dispatch =>
  async ({email, password, saveUser}) => {
    try {
      /// MOCK DATA (a remplacer par requete)
      const user = require('../../customData.json').user;
      ///

      if (email == user.email && password == user.password) {
        await AsyncStorage.setItem('token', user.simulToken);
        saveUser(user);
        dispatch({
          type: 'signin',
          payload: {token: user.simulToken, localLoading: false},
        });
      } else throw new Error();
    } catch (err) {
      dispatch({type: 'add_error', payload: 'Une erreur est survenue'});
    }
  };

const tryLocalSignIn =
  dispatch =>
  async ({saveUser}) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      try {
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
    navigation.navigate('SignIn');
  } catch (err) {
    console.log(err);
  }
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signup, signout, removeError, tryLocalSignIn},
  {token: null, error: '', loading: false, localLoading: true},
);
