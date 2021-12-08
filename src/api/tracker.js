import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from 'react-native-config';

import RNSimpleCrypto from 'react-native-simple-crypto';

export const baseURL = 'https://bacle-node-api.herokuapp.com';
const instance = axios.create({baseURL});

export let token;

instance.interceptors.request.use(
  async config => {
    token = await AsyncStorage.getItem('token');

    if (token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // PROTOCOLE HASH (SI GET, CONTIENT DEJA LES ARGUMENTS)
    let url = config.baseURL + config.url;

    try {
      if (config.method == 'post') {
        url = url + '?';
        // POST, AJOUT DES ARGUMENTS A L'URL
        for (const [key, value] of config.data._searchParams) {
          if (key != 'hash') {
            url = url + key + '=' + value + '&';
          }
        }
      } else {
        url = config.params != undefined ? url + '&' : url + '?';
      }

      url = url + 'secret=' + Config.REACT_APP_API_KEY;
      let hash = await RNSimpleCrypto.SHA.sha512(url);

      if (config.method == 'get') {
        config.params = {hash: hash, ...config.params};
      } else {
        config.data.append('hash', hash);
      }
    } catch (err) {
      console.log(err);
    }

    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

export const search = async place => {
  try {
    const req = await instance.get('/search/', {params: {q: place}});
    return req;
  } catch {
    console.log("Erreur search");
  }
};

export default instance;
