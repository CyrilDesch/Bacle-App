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
          const text = (value + '').replace('+', ' ');
          if (key != 'hash') {
            url = url + key + '=' + text + '&';
          }
        }
      } else {
        url += url.includes('?') ? '&' : '?';
      }

      url = url + 'secret=' + Config.REACT_APP_API_KEY;
      let hash = await RNSimpleCrypto.SHA.sha512(url);

      if (config.method != 'post') {
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

export const searchAll = async place => {
  try {
    const req = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${place}&format=json&limit=10`,
      {headers: {'User-Agent': 'Mozilla/5.0'}},
    );
    return req;
  } catch (err) {
    console.log('Erreur search');
  }
};

export const searchCity = async (place, cancelToken) => {
  try {
    const req = await axios.get(
      `https://nominatim.openstreetmap.org/search?city=${place}&format=json&limit=10`,
      {cancelToken: cancelToken, headers: {'User-Agent': 'Mozilla/5.0'}},
    );
    return req;
  } catch (err) {
    console.log('Erreur search');
  }
};

export default instance;
