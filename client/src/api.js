import axios from 'axios';

export default axios.create({
    baseURL:
        process.env.REACT_APP_ENV === 'production'
            ? 'https://production.tennis-buchs.ch/api/v1'
            : process.env.REACT_APP_ENV === 'staging'
            ? 'https://staging.tennis-buchs.ch/api/v1'
            : 'http://localhost:5000/api/v1',
});
