const { Pool } = require('pg');

const postgrePool = new Pool({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'hello world325',
    database: 'schedule',
    port: 5432   // default postgreSQL port
});

// Test connection on startup
postgrePool.connect()
    .then(client=> {
        console.log('[DB]: PostgreSQL Connected Successfully ~>');
        client.release();
    })
    .catch(err=> {
        console.log('[DB]: PostgreSQL Connection Failed: ', err.message);
    });

module.exports = postgrePool;