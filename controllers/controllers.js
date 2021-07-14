const ping = (req, res, next) => {
    res.status(200).send('pong');
};

const pong = (req, res, next) => {
    res.status(200).send('ping');
};

const updateUserMetadata = (req, res, next) => {
    // TODO: handle rate limits imposed by the management API
    if (!req.headers['X-Management-Token']) {
        res.status(401).send('No X-Management-Token header found');
    }
    res.status(200).send();
};

module.exports.ping = ping;
module.exports.pong = pong;
module.exports.updateUserMetadata = updateUserMetadata;
