const { Client } = require('pg');

const client = new Client({
    connectionString:
        process.env.NODE_ENV === 'production'
            ? process.env.HEROKU_POSTGRESQL_BRONZE_URL
            : process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

client.connect();
