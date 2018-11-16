# Introduction to Mongoose
Mongoose is a Node ODM module that adds Mongo support to Express applications. It uses schemas to model entities, and offers predefined validation along custom validations, allows to define virtual attributes, and uses middleware hooks to intercept operations.

It is designed to bridge the gap between the MongoDB schemaless approach and the requirements of real-world application development.

## Installing Mongoose
In order to install Mongoose for a project, it should be added as a dependency in the `package.json` file for the project then run `npm install`.

To check the latest available version of mongoose, go to the NPM repository an search for the `mongoose` package.

## Connecting to MongoDB
To connect to Mongo, we need to use the MongoDB connection URI.

The MongoDB URI is a URL that tells Mongo drivers how to connect to the database instance. Usually the URI is constructed in the following way: `mongodb://username:password@hostname:port/database`

Since we are using a local instance, we can skip the username and password. The simplest thing to do then is define the connection in the development environment configuration file like so:
```javascript
module.exports = {
    db:'mongodb://localhost/databaseName',
    //other configurations
}
```
Then in the configuration folder, we should start a new file containing the configurations for Mongoose and use the following code in order to request the mongoose module to connect to the database as set in the development configuration file:
```javascript
    var config = require('./config');
    var mongoose = require('mongoose');

    module.exports = function(){
        var db = mongoose.connecct(config.db);
        return db;
    };
```

The last step is to initialize the Mongoose configuration, which we do inside the server initilization file.
```javascript
var mongoose = require('./config/mongoose');
// bla bla bla other code
var db = mongoose();
var app = express();
app.listen(3000);

module.exports = app;

console.log('Server running at http://localhost:3000/');
```

Next: [Mongoose Schemas](mongooseSchemas.md)