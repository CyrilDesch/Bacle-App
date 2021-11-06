import errorHandler from '../errorHandler';
import trackerApi from './tracker';

export const emailCheckRequest = async email => {
  try {
    await trackerApi.get('/user/emailcheck?email=' + email);
  } catch (err) {
    throw errorHandler(err, {
      error409: "L'adresse email entrée est déjà utilisée.",
    });
  }
};

export const signInRequest = async (email, password) => {
  try {
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);
    const resp = await trackerApi.post('/user/login', params, {
      headers: {'content-type': 'application/x-www-form-urlencoded'},
    });
    return resp.data.access_token;
  } catch (err) {
    throw errorHandler(err, {
      error403: 'Le mot passe est incorrect.',
      error404: "L'adresse email donnée n'est lié à aucun compte.",
    });
  }
};

export const signUpRequest = async (email, password, lastName, firstName) => {
  try {
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);
    params.append('firstName', firstName);
    params.append('lastName', lastName);

    await trackerApi.post('/user/', params, {
      headers: {'content-type': 'application/x-www-form-urlencoded'},
    });
  } catch (err) {
    throw errorHandler(err, {
      error409: "L'adresse email entrée est déjà utilisée.",
    });
  }
};

export const getUserRequest = async () => {
  try {
    const resp = await trackerApi.get('/user/me');
    return resp.data;
  } catch (err) {
    throw 'Une erreur est survenue.';
  }
};
