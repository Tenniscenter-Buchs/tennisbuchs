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
    if (localStorage.getItem('managementToken')) {
        req.headers = {
            ...req.headers,
            'X-Management-Token':
                'Bearer ' + localStorage.getItem('managementToken'),
        };
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
        ErrorContext.callback(res.status, '', '', '');
        return res;
    },
    (error) => {
        Loader.disengage();
        var rc;
        var msg;
        if (error.response) {
            rc = error.response.status;
            var shortMsg;
            if (error.response.data) {
                shortMsg = error.response.data;
            } else {
                shortMsg = error.message;
            }
            msg =
                '[' +
                error.response.status +
                ' ' +
                error.response.statusText +
                '] - ' +
                shortMsg;
        } else {
            rc = error.status;
            msg = error.message;
        }
        ErrorContext.callback(
            rc,
            msg,
            JSON.stringify(error),
            JSON.stringify(error.response)
        );
        return Promise.reject(error);
    }
);

export default api;
