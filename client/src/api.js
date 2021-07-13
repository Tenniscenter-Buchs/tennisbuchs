import React from 'react';
import axios from 'axios';
import Loader from './main/loader.js';

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

api.interceptors.request.use((req) => {
    Loader.engage();
    if (localStorage.getItem('accessToken')) {
        req.headers.Authorization =
            'Bearer ' + localStorage.getItem('accessToken');
    }
    return req;
});

var ErrorContext = {
    callback: () => {},
};
export { ErrorContext };

api.interceptors.response.use(
    (res) => {
        Loader.disengage();
        ErrorContext.callback(true, res.status, '');
        return res;
    },
    (res) => {
        Loader.disengage();
        ErrorContext.callback(true, res.status, res.message);
        return res;
    }
);

export default api;
