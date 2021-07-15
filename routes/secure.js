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

/**
 * @openapi
 * /user/metadata:
 *   post:
 *     summary: Updates user metadata
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Signed and valid bearer token
 *       - in: header
 *         name: X-Management-Token
 *         required: true
 *         description: Signed and valid bearer token
 *     requestBody:
 *       description: The metadata to merge into the existing data points
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Metadata'
 *     description: Updates user metadata via Auth0 management API. Requires authorization.
 *     responses:
 *       200:
 *         description: User metadata has successfully been updated
 *       400:
 *         description: Invalid email
 *       401:
 *         description: No valid access token has been found in the request or insufficient permissions to access the resource or no valid management token has been found in the request or insufficient permissions to access the resource
 * components:
 *   schemas:
 *     Metadata:
 *       type: object
 *       properties:
 *         email:
 *           example: "info@example.com"
 *           type: string
 */
router.post('/user/metadata', controllers.updateUserMetadata);

/**
 * @openapi
 * /user/validate-metadata:
 *   post:
 *     summary: Validates user metadata
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Signed and valid bearer token
 *     requestBody:
 *       description: The metadata to merge into the existing data points
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Metadata'
 *     description: Updates user metadata via Auth0 management API. Requires authorization.
 *     responses:
 *       200:
 *         description: User metadata has successfully been updated
 *       400:
 *         description: Invalid email
 *       401:
 *         description: No valid access token has been found in the request or insufficient permissions to access the resource
 * components:
 *   schemas:
 *     Metadata:
 *       type: object
 *       properties:
 *         email:
 *           example: "info@example.com"
 *           type: string
 */
router.post('/user/validate-metadata', controllers.validateUserMetadata);

module.exports = router;
