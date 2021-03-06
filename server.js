const express = require('express');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const rateLimit = require('express-rate-limit');

const app = express();

const port = process.env.PORT || 5000;

app.set('trust proxy', 1);

if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'staging'
) {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https') {
            res.redirect(`https://${req.header('host')}${req.url}`);
        } else {
            next();
        }
    });
}

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'tennis-buchs.ch API Documentation | Swagger',
            version: '0.0.1',
            description:
                'This is a CRUD (CREATE, READ, UPDATE, DELETE) API application made with Express and documented with Swagger',
            license: {
                name: 'GNU General Public License v3.0',
                url: 'https://www.gnu.org/licenses/gpl-3.0.html',
            },
            contact: {
                name: 'Cedric Schwyter',
                email: 'cedricschwyter@bluewin.ch',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000/api/v1',
                description: 'Local Integration Testing for API Version 1',
            },
            {
                url: 'https://staging.tennis-buchs.ch/api/v1',
                description: 'Public Staging Testing for API Version 1',
            },
            {
                url: 'https://production.tennis-buchs.ch/api/v1',
                description: 'Production for API Version 1',
            },
        ],
    },
    apis: ['./routes/**/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(cors());

const limiter = rateLimit({
    windowMs: process.env.EXPRESS_RATE_LIMIT_WINDOW_MILLISECONDS || 1000,
    max: process.env.EXPRESS_RATE_LIMIT || 10,
    message: 'API rate limit hit, please try again in a short moment',
});

const pub = require('./routes/public');
app.use('/api/v1/', limiter, pub);

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri:
            (process.env.MANAGEMENT_URL ||
                'https://tennisbuchs-integration.eu.auth0.com') +
            '/.well-known/jwks.json',
    }),
    audience: process.env.AUDIENCE || 'http://localhost:5000/api/v1/',
    issuer:
        (process.env.MANAGEMENT_URL ||
            'https://tennisbuchs-integration.eu.auth0.com') + '/',
    algorithms: ['RS256'],
});

const secure = require('./routes/secure');
app.use('/api/v1/secure/', limiter, jwtCheck, secure);

if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'staging'
) {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`SERVICE PORT: ${port}`));
