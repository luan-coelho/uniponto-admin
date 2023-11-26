import { Gender } from '../types/types';
import Service from './Service';

export default class GenderService extends Service<Gender> {
    constructor() {
        super('/genders');
    }
}
