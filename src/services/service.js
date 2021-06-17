import axios from 'axios';
import * as config from './config';

export function fetchTurmas(user){
  return axios.get(`${config.URL_BASE}/api/turma?user=${user}`)
}
export function login(email, password){
  return axios.post(`${config.URL_BASE}/api/auth/`, {email:email, password:password})
}
export function signup(data){
  return axios.post(`${config.URL_BASE}/api/professor/`, data)
}
