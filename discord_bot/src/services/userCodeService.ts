import axios from 'axios';
import { UserCode } from '../models/userCode';
import withAxiosErrorHandling from '../utilities/axiosErrorHandling';
import { config } from '../utilities/config';

const baseURL = `${config.BASE_URL}/user_codes`;

axios.defaults.headers.common['Authorization'] = `Bearer ${config.BACKEND_DISCORD_TOKEN}`;

export async function findAll(): Promise<UserCode[]> {
    return withAxiosErrorHandling(() => axios.get<UserCode[]>(baseURL));
}

export async function findOne(uin: string, code: string): Promise<UserCode> {
    return withAxiosErrorHandling(() => axios.get<UserCode>(`${baseURL}/${uin}/${code}`));
}

export async function create(userCode: Partial<UserCode>): Promise<UserCode> {
    return withAxiosErrorHandling(() => axios.post<UserCode>(baseURL, userCode));
}

export async function update(uin: string, code: string, userCode: Partial<UserCode>): Promise<UserCode> {
    return withAxiosErrorHandling(() => axios.put<UserCode>(`${baseURL}/${uin}/${code}`, userCode));
}

export async function remove(uin: string, code: string): Promise<void> {
    return withAxiosErrorHandling(() => axios.delete(`${baseURL}/${uin}/${code}`));
}

export async function reset(): Promise<void> {
    return withAxiosErrorHandling(() => axios.delete(`${baseURL}/reset`));
}

export async function removeId(uin: string): Promise<void> {
    return withAxiosErrorHandling(() => axios.delete(`${baseURL}/${uin}`));
}

export async function findByUser(uin: string): Promise<UserCode[]> {
    return withAxiosErrorHandling(() => axios.get<UserCode[]>(`${baseURL}/user/${uin}`));
}

export async function findByCode(code: string): Promise<UserCode[]> {
    return withAxiosErrorHandling(() => axios.get<UserCode[]>(`${baseURL}/code/${code}`));
}