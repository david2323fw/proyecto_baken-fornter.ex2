import axios from 'axios';

const API_URL = 'http://localhost:3000/api/alumnos';

const token = localStorage.getItem('token');

// Configura axios para incluir el token en los headers
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: token ? token : ''
    }
});

export const fetchAlumnos = () => axiosInstance.get('/');
export const createAlumno = (data) => axiosInstance.post('/', data);
export const updateAlumno = (id, data) => axiosInstance.put(`/${id}`, data);
export const deleteAlumno = (id) => axiosInstance.delete(`/${id}`);
export const addTarea = (id, data) => axiosInstance.post(`/${id}/tareas`, data);
export const deleteTarea = (alumnoId, tareaId) => axiosInstance.delete(`/${alumnoId}/tareas/${tareaId}`);
