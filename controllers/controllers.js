const ping = (req, res, next) => {
    res.status(200).send('pong');
};

module.exports.ping = ping;
