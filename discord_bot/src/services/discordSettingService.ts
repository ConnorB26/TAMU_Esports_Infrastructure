import axios from 'axios';
import { DiscordSetting } from '../models/discordSetting';
import withAxiosErrorHandling from '../utilities/axiosErrorHandling';
import { config } from '../utilities/config';

const baseURL = 'http://backend:3001/discord_settings';

axios.defaults.headers.common['Authorization'] = `Bearer ${config.BACKEND_DISCORD_TOKEN}`;

export async function findAll(): Promise<DiscordSetting[]> {
    return withAxiosErrorHandling(() => axios.get<DiscordSetting[]>(baseURL));
}

export async function findOne(id: number): Promise<DiscordSetting> {
    return withAxiosErrorHandling(() => axios.get<DiscordSetting>(`${baseURL}/${id}`));
}

export async function create(discordSetting: Partial<DiscordSetting>): Promise<DiscordSetting> {
    return withAxiosErrorHandling(() => axios.post<DiscordSetting>(baseURL, discordSetting));
}

export async function update(name: string, discordSetting: Partial<DiscordSetting>): Promise<DiscordSetting> {
    return withAxiosErrorHandling(() => axios.put<DiscordSetting>(`${baseURL}/name/${name}`, discordSetting));
}

export async function remove(id: number): Promise<void> {
    return withAxiosErrorHandling(() => axios.delete(`${baseURL}/${id}`));
}
