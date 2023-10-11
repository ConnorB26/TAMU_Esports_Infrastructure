import axios from 'axios';
import withAxiosErrorHandling from '../utilities/axiosErrorHandling';
import { config } from '../utilities/config';
import { QOTDEntry } from '../models/qotdEntry';

const baseURL = `${config.BASE_URL}/role_commands`;

axios.defaults.headers.common['Authorization'] = `Bearer ${config.BACKEND_DISCORD_TOKEN}`;

export async function findAll(): Promise<QOTDEntry[]> {
    return withAxiosErrorHandling(() => axios.get<QOTDEntry[]>(baseURL));
}

export async function findOne(discord_id: number): Promise<QOTDEntry> {
    return withAxiosErrorHandling(() => axios.get<QOTDEntry>(`${baseURL}/${discord_id}`));
}

export async function create(role: Partial<QOTDEntry>): Promise<QOTDEntry> {
    return withAxiosErrorHandling(() => axios.post<QOTDEntry>(baseURL, role));
}

export async function update(discord_id: number, QOTDEntry: Partial<QOTDEntry>): Promise<QOTDEntry> {
    return withAxiosErrorHandling(() => axios.put<QOTDEntry>(`${baseURL}/${discord_id}`, QOTDEntry));
}

export async function remove(discord_id: number): Promise<void> {
    return withAxiosErrorHandling(() => axios.delete(`${baseURL}/${discord_id}`));
}