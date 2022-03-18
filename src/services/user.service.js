import axios from 'axios';
import * as config from './config';

export function loginStaff(email, password){
    return axios.post(`${config.URL_BASE}/user/staff/authentication/`, {email:email, password:password})
}
export function loginTeacher(email, password){
    return axios.post(`${config.URL_BASE}/user/teacher/authentication/`, {email:email, password:password})
}