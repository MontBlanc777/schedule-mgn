const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    title: { type: String, trim: true, required: true},       
    contents: String,    
    subject: {type: Number, enum: ['Dev', 'Myself', 'Cleanup']},    // for enum example   
    level: Number,
    score: Number,
    deadline: Date,
    createAt:{ type: Date, default: Date.now, unique: true},
    email: {
        type: String,
        match: /.+\@.+\..+/          //  predefined validate
    },
    password: {
        type: String,
        validate: [                  // custom validate
            function(password) {
                return password.length >= 6;
            },
            'Password should be longer'
        ]
    },
});

module.exports = mongoose.model('Schedule', ScheduleSchema);


/**  -----------
 *  Create
 *  */
// var user = require('mongoose').model('User');
// exports.create = function(req, res, next) {
//     var user = new user(req.body);
//     user.save(function(err) {
//         if(err) {
//             return next(err);
//         } else {
//             res.json(user);
//         }
//     })
// }


/** ------------
 * Find
 *  */ 
// exports.list = function(req, res, next) {
//     User.find({age: {$gt: 18}}, function(err, users) {
//         if(err) {
//             return next(err);
//         } else {
//             res.json(users);
//         }
//     })
// };

// const users = await User.find({age: {$gt: 18}});   // async await by UserModel

// // native mongoClient
// const users = await db.collection('users').find({age: {$gt: 18}}).toArray();  // async await by collection

/** ----------
 * Find One
 *  */ 
// exports.userById = function(req, res, next, id) {
//     UserActivation.findOne({
//         _id: id
//     }, function(err, user) {
//         if(err) {
//             return next(err);
//         } else{
//             req.user = user;     // is very important !!! ~  Ok?
//             next();
//         }
//     })
// }


/** ---------
 * Update
 *  */
// exports.update = function(req, res, next) {
//     User.findByAndUpdate(req.user.id, req.body, function(err, user) {
//         if(err) {
//             return next(err);
//         } else {
//             res.json(user);
//         }
//     })
// }

// // pdate a single document matching a condition
// await db.collection('users').updateOne(
//     { _id: 1 },  // filter
//     { $set: { age: 30 } }  // update operation
// );

// // Update multiple documents
// await db.collection('users').updateMany(
//     { age: { $lt: 18 } },  // filter condition
//     { $set: { status: 'minor' } }  // update operation
// );

// // Replace the whole document with a new one
// await db.collection('users').replaceOne(
//     { _id: 1 },  // filter
//     { name: 'John', age: 30, status: 'adult' }  // new document
// );


// // Find by ID and update
// await User.findByIdAndUpdate(
//     1,  // the ID to search
//     { $set: { age: 30 } },  // update operation
//     { new: true }  // return the updated document (default is the old document)
// );

//  // Important !!!!! ~ OK?
// const user = await User.findById(1);  // Find the user
// user.age = 30;  // Update the field directly
// await user.save();  // Save the changes


/** ---------
 * Delete
 *  */
// await db.collection('users').deleteOne({ _id: 1 });
// await db.collection('users').deleteMany({ status: 'inactive' });
// // // Important !!!!! ~ OK?
// const user = await User.findById(userId);
// await user.remove(); // deletes this specific user

/** ##################################
 *  # Deining custom model methods
*/

/* ## Deining custom static methods  */
// You could of course deine this method in your controller, but that
// wouldn't be the right place for it. What you're looking for is a static model method.
// To add a static method, you will need to declare it as a member of your schema's

// // - define
// UserSchema.statics.findOneByUsername = function (username,
//     callback) {
//     this.findOne({ username: new RegExp(username, 'i') }, callback);
// };

// // - use
// User.findOneByUsername('username', function(err, user){
//     // ...
// });

// // ## Deining custom instance methods  // instance : if just now get result
// // - define
// UserSchema.methods.authenticate = function(password) {
//     return this.password === password;
// };
// // - use
// user.authenticate('password');