const knex = require('knex')({
    client: "mysql",
    connection: {
        hots: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    pool: { min: 0, max: 10 },
});
module.exports = { knex };