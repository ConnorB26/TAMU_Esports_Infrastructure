import axios from 'axios';
import { ConfirmationCode } from '../models/confirmationCode';
import withAxiosErrorHandling from '../utilities/axiosErrorHandling';
import { config } from '../utilities/config';

const baseURL = 'http://backend:3001/confirmation_codes';

axios.defaults.headers.common['Authorization'] = `Bearer ${config.BACKEND_DISCORD_TOKEN}`;

export async function findAll(): Promise<ConfirmationCode[]> {
    return withAxiosErrorHandling(() => axios.get<ConfirmationCode[]>(baseURL));
}

export async function findOne(code: string): Promise<ConfirmationCode> {
    return withAxiosErrorHandling(() => axios.get<ConfirmationCode>(`${baseURL}/${code}`));
}

export async function create(confirmationCode: Partial<ConfirmationCode>): Promise<ConfirmationCode> {
    return withAxiosErrorHandling(() => axios.post<ConfirmationCode>(baseURL, confirmationCode));
}

export async function update(code: string, confirmationCode: Partial<ConfirmationCode>): Promise<ConfirmationCode> {
    return withAxiosErrorHandling(() => axios.put<ConfirmationCode>(`${baseURL}/${code}`, confirmationCode));
}

export async function remove(code: string): Promise<void> {
    return withAxiosErrorHandling(() => axios.delete(`${baseURL}/${code}`));
}
