import axios from 'axios';
import { User } from '../models/user';
import withAxiosErrorHandling from '../utilities/axiosErrorHandling';
import { config } from '../utilities/config';

const baseURL = `${config.BASE_URL}/users`;

axios.defaults.headers.common['Authorization'] = `Bearer ${config.BACKEND_DISCORD_TOKEN}`;

export async function findAll(): Promise<User[]> {
    return withAxiosErrorHandling(() => axios.get<User[]>(baseURL));
}

export async function findOne(uin: string): Promise<User> {
    return withAxiosErrorHandling(() => axios.get<User>(`${baseURL}/${uin}`));
}

export async function findOneDiscord(id: string): Promise<User> {
    return withAxiosErrorHandling(() => axios.get<User>(`${baseURL}/discord/${id}`));
}

export async function getResetDiscordIDs(): Promise<string[]> {
    return withAxiosErrorHandling(() => axios.get<string[]>(`${baseURL}/reset`));
}

export async function create(user: Partial<User>): Promise<User> {
    return withAxiosErrorHandling(() => axios.post<User>(baseURL, user));
}

export async function update(uin: string, user: Partial<User>): Promise<User> {
    return withAxiosErrorHandling(() => axios.put<User>(`${baseURL}/${uin}`, user));
}

export async function updateDiscord(id: string, user: Partial<User>): Promise<User> {
    return withAxiosErrorHandling(() => axios.put<User>(`${baseURL}/discord/${id}`, user));
}

export async function remove(uin: string): Promise<void> {
    return withAxiosErrorHandling(() => axios.delete(`${baseURL}/${uin}`));
}

export async function removeDiscord(id: string): Promise<void> {
    return withAxiosErrorHandling(() => axios.delete(`${baseURL}/discord/${id}`));
}
