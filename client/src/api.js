import axios from 'axios';
import Loader from './main/loader.js';
import { accessToken } from './auth/profile.js';

const base =
    process.env.REACT_APP_ENV === 'production'
        ? 'https://production.tennis-buchs.ch/api/v1'
        : process.env.REACT_APP_ENV === 'staging'
        ? 'https://staging.tennis-buchs.ch/api/v1'
        : 'http://localhost:5000/api/v1';

export { base };

const api = axios.create({
    baseURL: base,
});

api.interceptors.request.use(function (config) {
    Loader.engage();
    if (accessToken) {
        config.headers.Authorization = 'Bearer ' + accessToken;
    }
    return config;
});
api.interceptors.response.use(function () {
    Loader.disengage();
});

export default api;
