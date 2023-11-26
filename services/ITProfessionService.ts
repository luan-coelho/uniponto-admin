import { ITProfession } from '../types/types';
import Service from './Service';

export default class ITProfessionService extends Service<ITProfession> {
    constructor() {
        super('/professions');
    }
}
