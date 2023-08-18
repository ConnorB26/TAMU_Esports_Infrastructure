import axios from 'axios';
import withAxiosErrorHandling from '../utilities/axiosErrorHandling';
import { RoleCommand } from '../models/roleCommand';
import { config } from '../utilities/config';

const baseURL = `${config.BASE_URL}/role_commands`;

axios.defaults.headers.common['Authorization'] = `Bearer ${config.BACKEND_DISCORD_TOKEN}`;

export async function findAll(): Promise<RoleCommand[]> {
    return withAxiosErrorHandling(() => axios.get<RoleCommand[]>(baseURL));
}

export async function findOne(id: number): Promise<RoleCommand> {
    return withAxiosErrorHandling(() => axios.get<RoleCommand>(`${baseURL}/${id}`));
}

export async function create(role: Partial<RoleCommand>): Promise<RoleCommand> {
    return withAxiosErrorHandling(() => axios.post<RoleCommand>(baseURL, role));
}

export async function update(id: number, roleCommand: Partial<RoleCommand>): Promise<RoleCommand> {
    return withAxiosErrorHandling(() => axios.put<RoleCommand>(`${baseURL}/${id}`, roleCommand));
}

export async function remove(id: number): Promise<void> {
    return withAxiosErrorHandling(() => axios.delete(`${baseURL}/${id}`));
}

export async function removeVals(roleID: string, commandName: string) {
    return withAxiosErrorHandling(() => axios.delete(`${baseURL}/${roleID}/${commandName}`));
}