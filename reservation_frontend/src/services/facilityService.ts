import axios from 'axios';
import { backendUrl } from '../utilities/config';
import { Facility } from '../models/Facility';
import withAxiosErrorHandling from '../utilities/axiosErrorHandling';

const baseURL = `${backendUrl}/facilities`;

class FacilityAPI {
    static async findAll(): Promise<Facility[]> {
        return withAxiosErrorHandling(() => axios.get<Facility[]>(baseURL));
    }

    static async findOne(id: number): Promise<Facility> {
        return withAxiosErrorHandling(() => axios.get<Facility>(`${baseURL}/${id}`));
    }

    static async create(facility: Partial<Facility>): Promise<Facility> {
        return withAxiosErrorHandling(() => axios.post<Facility>(baseURL, facility));
    }

    static async update(id: number, facility: Partial<Facility>): Promise<Facility> {
        return withAxiosErrorHandling(() => axios.put<Facility>(`${baseURL}/${id}`, facility));
    }

    static async remove(id: number): Promise<void> {
        return withAxiosErrorHandling(() => axios.delete(`${baseURL}/${id}`));
    }
}

export default FacilityAPI;
