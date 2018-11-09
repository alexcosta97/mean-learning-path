# Configuring Sessions

Sessions are a common web application pattern that allows developers to keep track of the user's behaviour when they visit the web application.

To add this functionality, the `express-session` middleware needs to be installed, and that is done by adding the module to the dependencies of the project and then running `npm update`.

The `express-session` module uses a cookie-stored, signed identifier to identify the current user. To sign the session identifier, it will use a secret string, which will help prevent malicious session tampering.

For security reasons, it is recommended that the cookie secret be different for each environment, which means that this would be an appropriate place to use the environment configuration files. To do so, the `config/env/development.js` file needs to be modified in the following manner:
```javascript
    module.exports = {
        sessionSecret: 'developmentSessionSecret'
    };
```
Obviously, the session secret can be changed to whatever the developer wants. For other environments, there is only needed to add the `sessionSecret` property in the environment configuration file.

To use the configuration file and configure the express application, `config/express.js` needs to be modified to require the config module and to use the session module. The following lines of code need to be added to it:
```javascript
    var config = require('./config');

    //... code eliminated for brevety
    app.use(session({saveUninitialized: true, resave: true, secret: config.sessionSecret}));
```

The configuration objet is passed to the `express.session()` middleware. In this configuration object, the secret property is defined using the configuration file that is imported into that module.

The `session` middleware adds a `session` object to all the request objects in the application. Using this `session` object, any property that we wish can be set or get in the current session.

In order to test the session, the index controller needs to be changed as follows:
```javascript
    exports.render = function(req, res){
        if(req.session.lastVisit){
            console.log(req.session.lastVisit);
        }
        req.session.lastVisit = new Date();
        
        res.render('index', {
            title: 'Hello World!'
        });
    };
```
All that this code does is check the last time that the user has connected to the page and send it back to the console.