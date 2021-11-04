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

      // PROTOCOLE HASH
      let url = config.baseURL + config.url + '?';

      if (config.params != undefined) {
        for (const [key, value] of Object.entries(config.params)) {
          url = url + key + '=' + value + '&';
        }
      }

      if (config.data != undefined) {
        // POST
        for (const [key, value] of Object.entries(config.data)) {
          url = url + key + '=' + value + '&';
        }
      }

      url = url + 'secret=' + Config.REACT_APP_API_KEY;

      let hash = await RNSimpleCrypto.SHA.sha512(url);

      if (config.method == 'get') {
        config.params = {hash: hash, ...config.params};
      } else {
        config.data = {hash: hash, ...config.data};
      }

      return config;
    }
  },
  err => {
    return Promise.reject(err);
  },
);

export const search = async place => {
  try {
    const req = await instance.get('/search/', {params: {q: place}});
    return req;
  } catch {}
};

export default instance;
