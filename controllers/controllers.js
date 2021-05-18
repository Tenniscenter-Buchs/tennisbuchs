const ping = (req, res, next) => {
    res.status(200).send('pong');
};

const pong = (req, res, next) => {
    res.status(200).send('ping');
};

module.exports.ping = ping;
module.exports.pong = pong;
