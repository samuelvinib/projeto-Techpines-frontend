import api from './api';
import { Music } from '../types/music';

export const getMusicList = async (page = 1) => {
    const response = await api.get(`/music?page=${page}`);
    return response.data;
};

export const createMusic = async (data: Music) => {
    const response = await api.post('/music', data);
    return response.data;
};

export const updateMusic = async (id: number, data: Music) => {
    const response = await api.put(`/music/${id}`, data);
    return response.data;
};

export const deleteMusic = async (id: number) => {
    await api.delete(`/music/${id}`);
};