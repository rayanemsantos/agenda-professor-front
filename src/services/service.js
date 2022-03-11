import axios from 'axios';
import * as config from './config';

export function fetchTurmas(user) {
	return axios.get(`${config.URL_BASE}/api/turma?user=${user}`);
}

export function fetchAtividades(user) {
	return axios.get(`${config.URL_BASE}/api/atividade`);
}
export function newAtividade(data) {
	return axios.post(`${config.URL_BASE}/api/atividade`, data);
}
export function login(email, password) {
	return axios.post(`${config.URL_BASE}/api/auth/`, {
		email: email,
		password: password,
	});
}
export function signup(data) {
	return axios.post(`${config.URL_BASE}/api/professor/`, data);
}

export function fetchEvents(data) {
	return axios.get(`${config.URL_BASE}/api/calendario`, data);
}
export function newCalendarItem(data) {
	return axios.post(`${config.URL_BASE}/api/calendario`, data);
}
