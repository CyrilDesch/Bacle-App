import createDataContext from '../context/createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationRef from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signup':
      return { ...state, token: action.payload, error: ''};
    case 'signin':
      return { ...state, token: action.payload, error: ''};
    case 'signout': 
      return { ...state, token: null}
    case 'add_error':
      return { ...state, error: action.payload};
    case 'remove_error':
      return { ...state, error: ''};
    default:
      return state;
  };
};

const removeError = (dispatch) => () => {
  dispatch({type: 'remove_error'});
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    /// MOCK DATA (a remplacer par requete)
    const user = require('../../customData.json').user;
    ///
    await AsyncStorage.setItem('token', user.simulToken);
    dispatch({type: 'signup', payload: user.simulToken});
    NavigationRef.navigate('Home');
  } catch (err) {
    dispatch({type: 'add_error', payload: "Une erreur est survenue"});
  } 
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    /// MOCK DATA (a remplacer par requete)
    const user = require('../../customData.json').user;
    ///
    
    if(email == user.email && password == user.password){
      await AsyncStorage.setItem('token', user.simulToken);
      dispatch({type: 'signin', payload: user.simulToken});
      NavigationRef.navigate('Main');
    } else
      throw new Error();
  } catch (err) {
    dispatch({type: 'add_error', payload: "Une erreur est survenue"});
  } 
};

const tryLocalSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token){
    try {
      dispatch({type: 'signin', token});
      NavigationRef.navigate('Home');   
    } catch(err) {
      console.log(err);
      NavigationRef.navigate('SignUp');
    }
  } else {
    NavigationRef.navigate('SignUp');
  }
}

const signout = (dispatch) => async () => {
  try {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'signout'});
    NavigationRef.navigate('SignIn');
  } catch (err) {
    console.log(err);
  }
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signup, signout, removeError, tryLocalSignIn },
  { token: null, error: '' }
);