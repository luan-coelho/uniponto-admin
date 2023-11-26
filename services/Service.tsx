import { AxiosInstance, AxiosResponse } from 'axios';
import api from './api';
import { useFetch } from '../hooks/useFetch';
import { SWRResponse } from 'swr';

export default abstract class Service<T> {
    protected readonly api: AxiosInstance;

    constructor(private path: string) {
        this.api = api;
    }

    findAll(): SWRResponse<T[]> {
        return useFetch<T[]>(this.path);
    }

    findById(id: number): SWRResponse<T> {
        return useFetch<T>(`${this.path}/${id}`);
    }

    create(entity: T): Promise<AxiosResponse> {
        return this.api.post<T>(this.path, entity);
    }

    update(id: number, entity: T): Promise<AxiosResponse> {
        return this.api.put<T>(`${this.path}/${id}`, entity);
    }

    delete(id: number): Promise<AxiosResponse> {
        return this.api.delete<T>(`${this.path}/${id}`);
    }
}
