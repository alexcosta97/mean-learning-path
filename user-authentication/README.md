# User Authentication with Passport
Passport is a robust authentication middleware that helps us authenticate requests sent to an Express application. It uses strategies to utilize both local authentication and OAuth authentication providers. With Passport strategies, we can seamlessly offer different authentication options to users while maintaining a unified model.

In this part of the path we will go through the basic features of Passport:
* Understanding Passport strategies
* Integrating Passport into the users' MVC architecture
* Using Passport's local strategy to authenticate users
* Utilizing Passport OAuth strategies
* Offering authentication through social OAuth providers

## Introducing Passport
Nowadays, authentication is a vital part of most web applications. Handling user registration and sign-in is an important feature, which can sometimes present a development overhead.

Express, taking a lean approach, lacks the feature, so, as is usual when developing with Node, an external module is neeed. Passport uses the middleware design pattern to authenticate requests. It allows developers to offer various authentication methods using a mechanism called strategies, which allows us to implement complex authentication layers while keeping the code clean and simple.

Just like with any other Node module, before we can start using it, we first need to install it.

## Installing Passport
Passport uses different modules, each representing a different authentication strategy, but all of which depend on the base Passport module. To install the base module we need to add it to our `package.json` file:
```json
{
    "name": "MEAN",
    "version": "0.0.6",
    "dependencies": {
        "body-parser": "~1.8.0",
        "compression": "^1.7.3",
        "ejs": "~2.5.8",
        "express": "~4.16.4",
        "express-session": "~1.15.6",
        "method-override": "^3.0.0",
        "mongoose": "~5.3.12",
        "morgan": "~1.9.1",
        "passport": "~0.4.0"
    }
}
```

Before we can continue developing the application, we first need to make sure that the new dependency has been installed. For that we have to run `npm install` from the root of the project.

Once the installation process has successfully finished, we will need to configure the application to load the Passport module.

## Configuring Passport
To configure Passport, we will need to set it up in a few steps. First, we need to set up a configuration file in the config folder named `passport.js`. We can leave it empty for now and return to it in a bit. Then, we need to require the Passport's configuration file in the `server.js` file, and it looks as follows:
```javascript
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
express = require('./config/express'),
passport = require('./config/passport');

var db = mongoose();
var app = express();
var passport = passport();

app.listen(3000);

module.exports = app;

console.log('Server running at http://localhost:3000/');
```
Next, we need to register the Passport middleware to our Express application. To do son, we have to change our `config/express.js` file as follows:
```javascript
var config = require('./config');
var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var passport = require('passport');

module.exports = function(){
    var app = express();

    if(process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'));
    } else if(process.env.NODE_ENV === 'production'){
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(session({saveUninitialized: true, resave: true, secret: config.sessionSecret}));
    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    
    //Adding Passport to the Express app
    app.use(passport.initialize());
    app.use(passport.session());

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes')(app);
    app.use(express.static('./public'));
    return app;
}
```

First, we require the Passport module, and then registered two middleware: the `passport.initialize()` middleware, which is responsible for bootstrapping the Passport module and the `passport.session()` middleware, which is using the Express session to keep track of our user's session.

Passport is now installed and configured, but to start using it, we will have to install at least one authentication strategy. We'll begin with the local strategy, which provides a simple username/password authentication layer, but first we'll learn how strategies work.

Next: [Understanding Passport Strategies](passportStrategies.md)