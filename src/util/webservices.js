import axios from 'axios';

//http://localhost:4002/
const instance = axios.create({
  baseURL: `https://utilityapi.vercel.app/`,
  withCredentials: false,
});

instance.interceptors.request.use(
  async config => {
    let token = localStorage.getItem('token');
    let discoId = localStorage.getItem('discoId');

    config.headers = {
      'Authorization': `Bearer ${token}`,
      'discoId': discoId
    }

    return config;
  },
  error => {
    Promise.reject(error)
});

export default instance;
