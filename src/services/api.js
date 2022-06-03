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

// response interceptor
api.interceptors.response.use((response) => {
    return response
  }, async function (error) {
  
    const originalRequest = error.config;

    if (error.response.status === 401) {
        const refresher = await refreshToken(error);

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
          return resolve(res);
        })
        .catch((err) => {
          localStorage.clear();
          window.location.reload();
          return reject(error);
        });
    } catch (err) {
      return reject(err);
    }
  });
};

export default api;