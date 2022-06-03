import api from './api';

export function loginStaff(email, password){
    return api.post(`/user/staff/authentication/`, {email:email, password:password})
}
export function loginTeacher(email, password){
    return api.post(`/user/teacher/authentication/`, {email:email, password:password})
}