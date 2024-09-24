const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'schedule',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

exports.promisePool = pool.promise();

// Check connection on startup
pool.getConnection((err, connection) => {
    if (err) {
      console.error('[DB]: MySQL - Connection Failed:', err.message);
    } else {
      console.log('[DB]: MySQL - Connected Successfully ~>');
      connection.release();    // Release the connection back to the pool: 
      // if it no use, Error: Too many connections, SO You must use
    }
});

// // Test 1 = Test 2
// const test1 = async(req, res)=> {    // Test 1 
//     try {
//         const [rows] = await promisePool.query('SELECT * FROM users');
//     } catch(err) {
//         console.log(err)
//     }
// };

// const test2 = (req, res) => {        // Test2
//     promisePool.query('SELECT * FROM users')
//         .then((result)=> {
//             console.log(result[0]);
//         })
//         .catch(err=> {
//             console.log(err)
//         })
// }


/* 1) Let’s break down pool.query() vs pool.execute() — both are valid,
 but there’s a key difference you should know. */
// # 🔍 pool.query()
// More flexible, looser with syntax.
// Accepts placeholders (e.g., ?) but also parses and processes additional formats.
// Good for general-purpose queries, including when you don’t always need strict parameter bindings.

// # 🔐 pool.execute()
// Strict prepared statement execution.
// Running the same query repeatedly
// Working with transactions  !!! Important
// execute() becomes faster after ~5-10 executions due to prepared statement reuse  !!! Important
// Only allows parameterized queries.
// More secure and slightly more efficient when you’re always binding parameters.
// // If you try to run a non-parameterized query like pool.execute('SELECT * FROM users'), it’ll throw an error — you must provide [] as the second argument.



/* 2) connectionLimit in createPool() and pool.end() ? */
// So at most, 10 connections will be open at the same time. 
// The pool reuses them for efficiency.
// What happens if you call pool.end() inside a controller or model?
// Bad things. 😅 ❌ DON’T call pool.end() per request!
// You are shutting down the pool after one request. So:
// The next request to your server will fail.
// Error: Pool is closed. or similar.
// You basically kill your database connection for the whole app.
// do you understand?  yes.



// // Sample Method... https://metanit.com/web/nodejs

// promisePool.execute("UPDATE users SET age=age+1 WHERE name=?", ["Stan"])   // Update and then Select example
//     .then(result =>{     
//         console.log(result[0]);
//         return pool.execute("SELECT * FROM users");
//     })
//     .then(result =>{
//         console.log(result[0]);
//     })
//     .catch(function(err) {
//         console.log(err.message);
//     });

//     // ------ 1 -------

// const sql = "INSERT INTO users (name, age) VALUES(?, ?) ";
// const data = ["Bill", 25];
// pool.query(sql, data, function(err, results) {
//     if(err) console.log(err);
//     console.log(results);
// });
//     // ------ 2 -------

// const users = [
//     ["Bob", 22],
//     ["Alice", 25],
//     ["Kate", 28]
// ];
// const query = `INSERT INTO users(name, age) VALUES ?`;
// // const [rows] = await promisePool.query(query, [users]);

//     // ----- 3 -------
// const query1 = `SELECT * FROM users WHERE name=? AND age=?`;      // Select examaple
// const filter = ["Tom", 29];
// // const [rows] = await promisePool.query(query1, filter);


//     // ----- 4 ------
// const query2 = `UPDATE users SET age=? WHERE name=?`;
// const data1 = [34, "Tom"];
// const [rows] = await this.promisePool.query(query2, data1);


//     // ----- 5 ------
// const query3 = `DELETE FROM users WHERE name=?`;
// const data2 = ["Sam"];
// promisePool.query(query3, data2);
