import api from './axios';

export type LoginRequest = {
    email: string;
    password: string;
};


export type RegisterRequest = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword?: string;
};


export async function login(data: LoginRequest) {
    const res = await api.post('/auth/login', data)
    return res;
}

export async function register(data: RegisterRequest) {
    const res = await api.post('/auth/register', data);
    return res;
}

export async function getUser() {
    const res = await api.get('/auth/me');
    return res;
}