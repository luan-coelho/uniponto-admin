import axios from 'axios';

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASEAPI_URL });

export default api;
