import axios from 'axios';
import { UserCode } from '../models/userCode';
import withAxiosErrorHandling from '../utilities/axiosErrorHandling';
import { config } from '../utilities/config';

const baseURL = 'http://backend:3001/user_codes';

axios.defaults.headers.common['Authorization'] = `Bearer ${config.BACKEND_DISCORD_TOKEN}`;

export async function findAll(): Promise<UserCode[]> {
    return withAxiosErrorHandling(() => axios.get<UserCode[]>(baseURL));
}

export async function findOne(discordId: string, code: string): Promise<UserCode> {
    return withAxiosErrorHandling(() => axios.get<UserCode>(`${baseURL}/${discordId}/${code}`));
}

export async function create(userCode: Partial<UserCode>): Promise<UserCode> {
    return withAxiosErrorHandling(() => axios.post<UserCode>(baseURL, userCode));
}

export async function update(discordId: string, code: string, userCode: Partial<UserCode>): Promise<UserCode> {
    return withAxiosErrorHandling(() => axios.put<UserCode>(`${baseURL}/${discordId}/${code}`, userCode));
}

export async function remove(discordId: string, code: string): Promise<void> {
    return withAxiosErrorHandling(() => axios.delete(`${baseURL}/${discordId}/${code}`));
}
