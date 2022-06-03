import axios from "axios";
import * as config from './config';

const api = axios.create({
  baseURL: config.URL_BASE
});

// api.interceptors.request.use(
//     (response) => {
//         console.log('response', response)
//         const token = getToken();
//         if (token) {
//           response.headers.Authorization = `Bearer ${token}`;
//         }
//         return response;
//     },
//     async function (error) {
//         console.log('error', error)
//         const access_token = localStorage.getItem("access");
//         if (error.response.status === 401 && access_token) {
//           const response = await refreshToken(error);
//           return response;
//         }
//         return Promise.reject(error);
//     }
// );

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