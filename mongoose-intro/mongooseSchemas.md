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

After the controller method has been added to the application, the route for the new method also needs to be added to the application so that it can be accessed.