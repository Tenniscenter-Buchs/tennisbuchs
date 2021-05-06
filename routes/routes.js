const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');

/**
 * @openapi
 * /ping:
 *   get:
 *     description: Simple ping route to check whether the API is reachable
 *     responses:
 *       200:
 *         description: Returns "pong" just for the fun of it
 */
router.get('/ping', controllers.ping);

module.exports = router;
