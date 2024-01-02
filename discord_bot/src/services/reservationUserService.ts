import axios from 'axios';
import withAxiosErrorHandling from '../utilities/axiosErrorHandling';
import { ReservationUser } from '../models/reservationUser';
import { config } from '../utilities/config';

const baseURL = `${config.BASE_URL}/reservation_user`;

axios.defaults.headers.common['Authorization'] = `Bearer ${config.BACKEND_DISCORD_TOKEN}`;

export async function findAll(): Promise<ReservationUser[]> {
    return withAxiosErrorHandling(() => axios.get<ReservationUser[]>(baseURL));
}

export async function findOne(uin: string): Promise<ReservationUser> {
    return withAxiosErrorHandling(() => axios.get<ReservationUser>(`${baseURL}/${uin}`));
}

export async function create(reservationUser: Partial<ReservationUser>): Promise<ReservationUser> {
    return withAxiosErrorHandling(() => axios.post<ReservationUser>(baseURL, reservationUser));
}

export async function update(uin: string, reservationUser: Partial<ReservationUser>): Promise<ReservationUser> {
    return withAxiosErrorHandling(() => axios.put<ReservationUser>(`${baseURL}/${uin}`, reservationUser));
}

export async function remove(uin: string): Promise<void> {
    return withAxiosErrorHandling(() => axios.delete(`${baseURL}/${uin}`));
}
