import axios from "axios";
import * as config from './config';

const api = axios.create({
  baseURL: config.URL_BASE
});

// request interceptor
api.interceptors.request.use(
  config => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  error => {
      Promise.reject(error)
});


api.interceptors.response.use((response) => {
    return response
  }, function (error) {
    console.log('error', error.response.status)
    const originalRequest = error.config;

    if (error.response.status === 401){
        // router.push('/login');
        return Promise.reject(error);
    }

    if (error.response.status === 401) {
        
      originalRequest._retry = true;

        const refresher = refreshToken(error);

        if (refresher){
          return api(originalRequest);
        }
    }
  return Promise.reject(error);
});

const getToken = () => localStorage.getItem('access');

async function refreshToken(error) {
    return new Promise((resolve, reject) => {
      try {
        const refresh_token = localStorage.getItem("refresh");
        const header = {
          "Content-Type": "application/json",
        };
        const parameters = {
          method: "POST",
          headers: header,
        };
        const body = {
          refresh: refresh_token,
        };
        axios
          .post(
            config.URL_BASE + "/token/refresh/",
            body,
            parameters
          )
          .then(async (res) => {
            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh_token", res.data.refresh);
            // Fazer algo caso seja feito o refresh token
            return resolve(res);
          })
          .catch((err) => {
            // Fazer algo caso não seja feito o refresh token
            return reject(error);
          });
      } catch (err) {
        return reject(err);
      }
    });
  };

export default api;