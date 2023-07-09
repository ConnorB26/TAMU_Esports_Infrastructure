import axios from 'axios';
import { User } from '../models/user';
import withAxiosErrorHandling from '../utilities/axiosErrorHandling';
import { config } from '../utilities/config';

const baseURL = 'http://backend:3001/users';

axios.defaults.headers.common['Authorization'] = `Bearer ${config.BACKEND_DISCORD_TOKEN}`;

export async function findAll(): Promise<User[]> {
    return withAxiosErrorHandling(() => axios.get<User[]>(baseURL));
}

export async function findOne(discordId: string): Promise<User>
{
    return withAxiosErrorHandling(() => axios.get<User>(`${baseURL}/${discordId}`));
}

export async function create(user: Partial<User>): Promise<User> {
    return withAxiosErrorHandling(() => axios.post<User>(baseURL, user));
}

export async function update(discordId: string, user: Partial<User>): Promise<User> {
    return withAxiosErrorHandling(() => axios.put<User>(`${baseURL}/${discordId}`, user));
}

export async function remove(discordId: string): Promise<void> {
    return withAxiosErrorHandling(() => axios.delete(`${baseURL}/${discordId}`));
}
