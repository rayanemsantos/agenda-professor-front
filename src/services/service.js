import axios from 'axios';
import * as config from './config';

/* Login e Cadastro */
export function login(email, password) {
	return axios.post(`${config.URL_BASE}/auth/`, {
		email: email,
		password: password,
	});
}
export function signup(data) {
	return axios.post(`${config.URL_BASE}/professor/`, data);
}

/* Alunos */
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

/* Turmas */
export function fetchTurmas() {
	return axios.get(`${config.URL_BASE}/school_class/`);
}
export function newTurmas(data) {
	return axios.post(`${config.URL_BASE}/school_class/`, data);
}
export function editTurmas(id, data) {
	return axios.put(`${config.URL_BASE}/school_class/${id}/`, data);
}

/* Matérias */
export function fetchMaterias() {
	return axios.get(`${config.URL_BASE}/school_class_subject/`);
}
export function newMaterias(data) {
	return axios.post(`${config.URL_BASE}/school_class_subject/`, data);
}

/* Professores */
export function fetchProfessores() {
	return axios.get(`${config.URL_BASE}/teacher/`);
}
export function fetchProfessor(id) {
	return axios.get(`${config.URL_BASE}/teacher/${id}`);
}
export function newProfessor(data) {
	return axios.post(`${config.URL_BASE}/user/teacher/registration/`, data);
}
export function editProfessor(id, data) {
	return axios.put(`${config.URL_BASE}/teacher/${id}/`, data);
}

/* Eventos */
export function fetchEvents(data) {
	return axios.get(`${config.URL_BASE}/calendario`, data);
}
export function newCalendarItem(data) {
	return axios.post(`${config.URL_BASE}/calendario`, data);
}

/* Atividades */
export function fetchAtividades(user) {
	return axios.get(`${config.URL_BASE}/atividade/`);
}
export function newAtividade(data) {
	return axios.post(`${config.URL_BASE}/atividade`, data);
}
