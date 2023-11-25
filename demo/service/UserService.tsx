import { ITProfession } from '../../types/types';
import api from './api';

export const UserService = {
    path: 'profissions',
    createProfission(itProfession: ITProfession): Promise<void> {
        return api.post(this.path, itProfession);
    },
};
