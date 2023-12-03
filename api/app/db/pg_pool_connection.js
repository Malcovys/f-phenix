const path =  require('path');
require('dotenv').config({
    override: true,
    path: path.join(__dirname, 'dev.env')
});

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 50,
    connectionTimeoutMillis: 20000,
    idleTimeoutMillis: 20000,
    allowExitOnIdle: false
});

pool.on('connect', async () => {
    const { rows } = await pool.query('SELECT current_user');
    const currentUser = rows[0]['current_user'];
    console.log(currentUser + ' is connected.');
    await pool.end();
});

