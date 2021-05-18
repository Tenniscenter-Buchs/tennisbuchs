const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');

/**
 * @openapi
 * /pong:
 *   get:
 *     summary: Returns "ping"
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Signed and valid bearer token
 *     description: Simple pong route to check whether the API is reachable. Requires authorization.
 *     responses:
 *       200:
 *         description: Returns "ping" just for the fun of it
 *       401:
 *         description: No valid access token has been found in the request or insufficient permissions to access the resource
 */
router.get('/pong', controllers.pong);

module.exports = router;
