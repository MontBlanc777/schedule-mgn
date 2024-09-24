const mongoose = require('mongoose');
const mongoConfig = require('./db-config');

module.exports = function() {
    const mongoDB = mongoose.connect(mongoConfig.db)
        .then(()=> {
            console.log('[DB]: MongoDB - Connecton Successful ~>')
        })
        .catch(err=> {
            console.log(`[DB]: MongoDB - Connection Error: ${err}`)
        });

    return mongoDB;
}

// important! aggregation..  point
// 1) Mongoose:  Model.aggregate([...])        await or .exec(), but no .toArray();
// 2) MongoClient(Native Mongo):  db.collection('users').aggregate([...])     .toArray() - required to get results



/** 
 *  schedule model reference !!! 
 *  2025.4.14
*/