const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

const port = process.env.PORT || 5000;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "tennis-buchs.ch API Documentation | Swagger",
            version: "0.0.1",
            description: "This is a CRUD (CREATE, READ, UPDATE, DELETE) API application made with Express and documented with Swagger",
            license: {
                name: "GNU General Public License v3.0",
                url: "https://www.gnu.org/licenses/gpl-3.0.html",
            },
            contact: {
                name: "Cedric Schwyter",
                email: "cedricschwyter@bluewin.ch",
            },
        },
        servers: [
            {
                url: "http://localhost:5000/",
            },
        ],
    },
    apis: ["./routes/**/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
      "/api-docs",
      swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);

app.use((req, res, next) => {
    console.log(`Request Endpoint: ${req.method} ${req.url}`);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

const api = require('./routes/routes');
app.use('/api/v1/', api);

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};

app.get('*', (req, res) => {
  res.status(200).json({
        msg: 'Catch All'
    });
});

app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));
