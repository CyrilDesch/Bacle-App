import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const baseURL = 'https://bacle-node-api.herokuapp.com';
const instance = axios.create({baseURL});

export let token;

instance.interceptors.request.use(
  async config => {
    token = await AsyncStorage.getItem('token');
    if (token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
  },
  err => {
    return Promise.reject(err);
  },
);

export default instance;
