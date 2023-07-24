import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:5555/',
  responseType: 'json',
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
});