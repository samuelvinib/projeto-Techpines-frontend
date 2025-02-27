import api from './api';
import { Music } from '../types/music';

export const getMusicList = async (page?:number, per_page?:number) => {
    const response = await api.get(`/music?page=${page}&per_page=${per_page}`);
    return response.data;
};

export const getPendentMusicList = async () => {
    const response = await api.get(`/music/pending`);
    return response.data;
};

export const createMusic = async (data: Music) => {
    const response = await api.post('/music', data);
    return response.data;
};

export const updateMusic = async (id: number, data: Partial<Music>) => {
    const response = await api.put(`/music/${id}`, data);
    return response.data;
};

export const deleteMusic = async (id: number) => {
    await api.delete(`/music/${id}`);
};