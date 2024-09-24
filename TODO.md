# node.js develop env build
- step1: nodejs.org / nodejs package `install`
- step2: verdaccio.org, npmjs.com, express.js `visit` and then `concept build`
```
- npmjs.com account info
    username: williamjackson
    email: wiliamjackson1220@gmail.com
    pwd: hello world325 
```
- step3: local dirver / make work folder
- step4: command run `npm init` 
- step5: command run `npm config set registry https://registry.npmjs.org`


`
UserSchema.statics.findOneByUsername = function (username,
callback) {
this.findOne({ username: new RegExp(username, 'i') }, callback);
};

User.findOneByUsername('username', function(err, user){
...
});


UserSchema.methods.authenticate = function(password) {
    return this.password === password;
};

user.authenticate('password');    // password check
`

Using pre middleware
UserSchema.pre('save', function(next) {
if (...) {
next()
} else {
next(new Error('An Error Occured'));
}
});

Using post middleware
UserSchema.post('save', function(next) {
if(this.isNew) {
console.log('A new user was created.');
} else {
console.log('A user updated is details.');
}
});





# pm2 module usage
# mysql module usage
# redis moudule usage
# mongoose usage
# oracle db connection method
# postgre sql query study & oracle sql query study..
# React.js CRA App install and structure
# trnaslate