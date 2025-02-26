import api from './api';
import { LoginData, RegisterData } from '../types/user';

export const login = async (data: LoginData) => {
    const response = await api.post('/auth/login', data);
    return response.data;
};

export const register = async (data: RegisterData) => {
    const response = await api.post('/auth/register', data);
    return response.data;
};

export const logout = async () => {
    await api.post('/auth/logout');
};

export const me = async () => {
    const response = await api.post('/auth/me');
    return response.data;
};