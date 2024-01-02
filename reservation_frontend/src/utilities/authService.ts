import axios from 'axios';
import { backendUrl } from '../config';

export const checkTokenValidity = async (token: string): Promise<any> => {
    try {
        const response = await axios.get(`${backendUrl}/reservation_auth/validate-token/${token}`);
        return response.data;
    } catch (error) {
        return null;
    }
};