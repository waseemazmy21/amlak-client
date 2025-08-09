import { LoginFormData, RegisterFormData } from '@/lib/schemas/user';
import api from './axios';

export async function login(data: LoginFormData) {
    const res = await api.post('/auth/login', data)
    return res;
}

export async function register(data: RegisterFormData) {
    const { fullName, email, password, phone, bio } = data
    const res = await api.post('/auth/register', {
        fullName,
        email,
        password,
        phone,
        bio: bio || undefined
    });
    return res;
}

export async function getUser() {
    const res = await api.get('/auth/me');
    return res;
}

export async function logout() {
    const res = await api.post('/auth/logout')
    return res
}