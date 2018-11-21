# Understanding Passport Strategies
To offer its various authentication options, Passport uses separate modules that implement different authentication strategies. Each module provides a different authentication method, such as local username and password authentication or OAuth authentication.

In order to offer Passport-supported authentication, we'll need to install and configure the strategies modules that we'd like to use.

## Using Passport's local strategy
Passport's local strategy is a Node module that allows us to implement a username and password authentication mechanism. We'll need to install it like any other module and configure it to use the User model.

### Installing the module
To install the local strategy module, we need to update the `package.json` file and add the following dependency:
```json
"passport-local": "~1.0.0"
```
After that we have to run the `npm install` command with the terminal in the root directory of the project.

After the module is installed, we then need configure the base Passport module to use the local strategy.

### Configuring Passport's local strategy
Each authentication strategy we'll use is basically a node module that lets us define how that strategy will be used. In order to maintain a clear separation of logic, each strategy should be configured in its own separated file. Therefore, inside the config folder we have to create a folder named `strategies`. Inside this new folder, we can then create a file named `local.js` containing the following code:
```javascript
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function(){
    passport.use(new LocalStrategy(function(username, password, done){
        User.findOne({
            username: username
        }, function(err, user){
            if(err){
                return done(err);
            }

            if(!user){
                return done(null, false, {
                    message: 'Unknown user'
                });
            }

            if(!user.authenticate(password)){
                return done(null, false, {
                    message: 'Invalid password'
                });
            }

            return done(null, user);
        });
    }));
};
```

This code begins by requiring the Passport module, the local strategy module's Strategy object, and the User Mongoose model. Then, we register the strategy using the `passport.use()` method that uses an instance of the `LocalStrategy` object.

The LocalStrategy constructor takes a callback function as an argument. This callback will be used later when trying to authenticate a user.