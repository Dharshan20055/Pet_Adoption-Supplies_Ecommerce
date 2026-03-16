import axios from 'axios';

const API_BASE_URL = "http://localhost:8081/pets";

export const getAllPets = () => axios.get(API_BASE_URL);

export const filterPets = (filters) => {
    const { type, breed, location } = filters;
    return axios.get(`${API_BASE_URL}/filter`, {
        params: { type, breed, location }
    });
};

export const addPet = (petData) => axios.post(`${API_BASE_URL}/add`, petData);