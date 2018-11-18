# Understanding Mongoose Schemas

As we know, Mongo uses collections to store multiple documents that don't need to have the same structure. However, when dealing with objects, it is sometimes necessary for documents to be similar. Mongoose helps with that by using a Schema object to define the document list of properties, each with its own type and constraints, which helps enforce the document structure.

After a schema is specified, we then need to define a Model constructor that will be used to create instances of MongoDB documents.

## Creating the user schema and model
To create the first schema, we should create a new file in the models folder with a name similar to `modelName.server.model.js`. On that file we would have code similar to this (which defines a user):
```javascript
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var UserSchema = new Schema({
        firstName: String,
        lastName: String
        email: String,
        username: String,
        password: String
    })l

    mongoose.model('User', UserSchema);
```

This code snippet does two things:
* It defines the UserSchema object using the Schema constructor
* It defines the User model by using the schema instance.

## Regitering the Model

Before we can start using the models we create, we first need to include the model file in the Mongoose configuration file so that the model is registered. For that, we change the configuration file to look something like this:
```javascript
    var config = require('/config');
    var mongoose = require('mongoose');

    module.exports = function(){
        var db = mongoose.connect(config.db);
        require('../app/models/modelName.server.model');
        return db;
    };
```

After loading the model into Mongoose, we then need to make sure that the mongoose configuration file is the first to be loaded in our server program, so that the other modules don't need to load the model by themselves.

## Crearing new users using save()
After the model is loaded on the application, it can be used right away, but it is better to first create a controller that will handle all the model-related operations so that everything is kept organized in the application.

Under the app controllers folder, we can then create a file named `modelNameInPlural.server.controller.js` and then add the following code:
```javascript
    var Model = require('mongoose').model('modelName');
    exports.create = function(req, res, next){
        var modelInstance = new Model(req.body);

        modelInstance.save(function(err){
            if(err){
                return next(err);
            } else{
                res.json(user);
            }
        });
    };
```

The first thing that the code does is use Mongoose to call the model method which returns the model that was previously defined. Next, a create controller method is defined, which will later be used to create new users. Using the new keyword, the method creates a new instance of the model, which is populated with the request body. Finally, the model instance's save method is called that either saves the model instance and outputs it back to the user or fails and passes the error to the next middleware.

To test the new controller, we can add a set of user-related routes that call the controller's meethods. Since the Express application serves mainly as a RESTful API for the Angular applciation, it is a best practice to build the routes according to the REST principles. In the case of the create method, the proper way is to use an HTTP `POST` request to the base route.

The next step is to add the routes for the new controller into the express configuration file.

## Finding multiple documents using find()
The `find()` method is a model method that retrieves multiple documents stored in the same collection using a query and is a Mongoose implementation of the MongoDB `find()` collection method. To understand it better, we can add a `list()` method to the controller file:
```javascript
exports.list = function(req, res, next){
    Model.find({}, function(err, modelNames){
        if(err){
            return next(err);
        }else{
            res.json(models);
        }
    })
}
```

The new `liat()` method uses the find method to retrieve an array of all the documents in the `users` collection. To be able to use the new method, we need to register a route to it, and we can add it as a GET route in the users route file:
```javascript
var controller = require('../../app/controllers/users.server.controller');

module.exports = function(app){
    app.route('./controllerName')
        .post(controller.create)
        .get(controller.list);
};
```

## Advanced querying using find
In the preceding example, the find method accepts two arguments, a MongoDB query object and a callback function, but it can accept up to four parameters:

* Query: This is a MongoDB query object
* `[Fields]`: This is an optional string object that represents the document fields to return
* `[Options]`: This is an optional options object
* `[Callback]`: This is an optional callback function

For instance, to retrieve only the usernames and emaiil addresses of the users documents, we would modify the call to look like the following lines of code:
```javascript
    User.find({}, 'username email', function(err, users){
        ...
    });
```

Furthermore, we can also pass an options object when calling the `find()` method, which will manipulate the query result. For instance, to paginate through the `users` collection, we can use the `skip` and `limit` options as follows:
```javascript
    User.find({}, 'username email', {
        skip: 10,
        limit: 10
    }, function(err, users){
        ...
    });
```
This returns a subset of up to 10 user documents while skipping the first 10 documents.

To learn more about query options, see the [Mongoose official documentation](http://mongoosejs.com/docs/api.html).

## Reading a single user document using findOne()
Retrieving a single user document is done using the `findOne()` method, which is very similar to the `find()` method, but retrieves only the first document of the subset. To start working with a single user document, we have to add two mew methods in the controller:
```javascript
exports.read = function(req, res){
    res.json(req.user);
};

exports.userByID = function(req, res, next, id){
    User.findOne({_id: id}, function(err, user){
        if(err){
            return next(err);
        } else{
            req.user = user;
            next();
        }
    })
}
```

The `read()` method is simple and it just responds with a JSON representation of the `req.user` object. The `userById()` method is the one responsible for populating the `req.user` object. That method is used as a middleware to deal with the manipuilation of single documents when performing read, delete and update operations. To do that we will have to modify the routes file:
```javascript
var users = require('../../app/controllers/users.server.controller');

module.exports = function(app){
    app.route('users').post(users.create).get(users.list);

    app.route('/users/:userId').get(users.read);
    app.param('userId', users.userByID);
}
```

In Express, adding a colon before a substring in a route definition means that the substring will be handled as a request parameter. To handle the population of the `req.user` object, we use the `app.param()` method that defines the middleware to be executed before any other middleware that uses that parameter. Here, the `users.userByID()` method will be executed before any other middleware registered with the `userId` parameter, which in this case is the `users.read()` middleware. This patter is use when building a RESTful API, where we often add request parameters to the routing string.

## Updating an existing user document
The Mongoose model has several methods available to update existing documents. Among these are `update()`, `findOneAndUpdate()` and `findByIdAndUpdate()`. Each of the methods serves a different level of abstraction, easing the update operation when possible. In our case, since we already use the `userById()` middleware, the easiest way to update an existing document would be to use the `findByIdAndUpdate()` method. In that case, we need to update our users' controller and add a new `update()` method:
```javascript
    exports.update = function(req, res, next){
        User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
            if(err){
                return next(err);
            } else{
                res.json(user);
            }
        });
    };
```

Here we use the user's id field to find and update the correct document. The next thing we should do is wire our new `update()` method in our routing method.

## Deleting an existing user document
The Mongoose model has several available methods to remove an existing document. Among these are `remove()`, `findOneAndRemove()` and `findByIdAndRemove()`. Since we already use the `userById()` middleware, the simplest way to delete an existing document is to use the `remove()` method. To do so, we need to add the following method to the users' controller:
```javascript
    exports.delete = function(req, res, next){
        req.user.remove(function(err){
            if(err){
                return next(err);
            } else{
                res.json(req.user);
            }
        });
    };
```

For this example, we used the user object that `userByID()` sends to remove the correct document. The next thing we should do is use the new `delete()` method in the users' routing file.

Next: [Extending Mongoose Schemas](mongooseSchemasExtension.md)