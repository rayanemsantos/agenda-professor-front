import axios from 'axios';
import * as config from './config';

export function fetchAtividades(user) {
	return axios.get(`${config.URL_BASE}/atividade/`);
}
export function newAtividade(data) {
	return axios.post(`${config.URL_BASE}/atividade`, data);
}

export function login(email, password) {
	return axios.post(`${config.URL_BASE}/auth/`, {
		email: email,
		password: password,
	});
}
export function signup(data) {
	return axios.post(`${config.URL_BASE}/professor/`, data);
}

export function fetchEvents(data) {
	return axios.get(`${config.URL_BASE}/calendario`, data);
}
export function newCalendarItem(data) {
	return axios.post(`${config.URL_BASE}/calendario`, data);
}

export function fetchStudents() {
	return axios.get(`${config.URL_BASE}/student/`);
}

export function fetchStudent(id) {
	return axios.get(`${config.URL_BASE}/student/${id}`);
}

export function newStudent(data) {
	return axios.post(`${config.URL_BASE}/student/`, data);
}
export function editStudent(id, data) {
	return axios.put(`${config.URL_BASE}/student/${id}/`, data);
}

export function fetchTurmas() {
	return axios.get(`${config.URL_BASE}/school_class/`);
}
export function newTurmas(data) {
	return axios.post(`${config.URL_BASE}/school_class/`, data);
}
export function editTurmas(id, data) {
	return axios.put(`${config.URL_BASE}/school_class/${id}/`, data);
}
