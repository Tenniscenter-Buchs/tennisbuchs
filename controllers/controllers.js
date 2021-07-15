const axios = require('axios');
const jwt_decode = require('jwt-decode');

const ping = (req, res, next) => {
    res.status(200).send('pong');
};

const pong = (req, res, next) => {
    res.status(200).send('ping');
};

const validateUserMetadata = (req, res, next) => {
    // TODO: implement
    res.status(200).send();
};

const updateUserMetadata = async (req, res, next) => {
    const managementToken = req.headers['x-management-token'];
    if (!managementToken) {
        res.status(401).send('No X-Management-Token header found');
        return;
    }
    const managementResponse = await axios.patch(
        'https://tennisbuchs-integration.eu.auth0.com/api/v2/users/' +
            jwt_decode(managementToken).sub,
        { user_metadata: { ...req.body } },
        {
            headers: { Authorization: managementToken },
        }
    );
    res.status(managementResponse.status).send(managementResponse.body);
};

module.exports.ping = ping;
module.exports.pong = pong;
module.exports.validateUserMetadata = validateUserMetadata;
module.exports.updateUserMetadata = updateUserMetadata;
