require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRoutes = require('./api/routing/user');
const adminRoutes = require('./api/routing/admin');
const config = require('./api/config/config');

const mongo = require('./api/Database/mongoDB/mongoConnect');
const promisePool = require('./api/Database/mySql/mySql');
const postgrePool = require('./api/Database/postgreSql/postgre');

const app = express();

if(process.env.NODE_ENV === 'developement') {
    app.use(morgan('dev'));
} else {
    app.use(compress());
}

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

app.use(cookieParser());
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
}));

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// app.get('/user/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client/user', 'index.html'));
// });
// app.get('/admin/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client/admin', 'index.html'));
// });


/* Database Related */
// mongodb
const mongodb = mongo();
// mysql
const mysql = promisePool;
// postgreSQL
const postgre = postgrePool;
/* ~ */

const port = process.env.PORT || 3001;

app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

app.use(express.static(path.join(__dirname, 'client/admin')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/admin', 'index.html'));
});

app.listen(port, ()=> {
    console.log(`Server Running at http://localhost:${port}`);
}); 

module.exports = app;