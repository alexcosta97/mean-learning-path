# Extending Mongoose Schemas
## Defining default values
Defining default field values ia a commmon feature for data modelling frameworks. We can do that directly in the application's logic layer, but that's a bit messy and generally a bad practice. Mongoose offers to define default values at a schema level, helping organize the code better.

An example of using a default value would be to add a `created` date field to the user schema that would be initialized at creation time and save the time the user document was intially created. To do that, we have to change the user model in the following way:
```javascript
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var UserSchema = new Schema({
        firstName: String.
        lastName: String,
        email: String,
        username: String,
        password: String,
        created: {
            type: Date,
            default: Date.now
        }
    });
```

From now on, every new user document will be created with a default creation date that represents the moment the document was created. Every document created prior to the change will be assigned a `created` field representing the moment it was queried for, since these documents don't have the field initialized.

## Using schema modifiers
Sometimes, we may want to perform a manipulation over schema fields before saving them or presenting them to the client. For that purpose, Mongoose uses a feature called modifiers. A modifier can either change the field's value before saving the document or represent it differently at query time.

### Predefined modifers
The simplest modifiers are the predefined ones included with Mongoose. For example, string-type fields can have a trim modifier to remove whitespaces, an uppercase modifier to uppercase the field value, and so on. For example, back on the users' model, we can use a trim modifier to make sure that usernames are clear from a leading and trailing whitespace. The code for the model would then look like the following:
```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    username:{
        type: String,
        trim: true
    },
    password: String,
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('User', UserSchema);
```

### Custom setter modifiers
Predefined modifiers are great, but we can also define our own custom setter modififers to handle data manipulation before saving the document. To understand this better, we can add a new website field to our User model. The `website` field should begin with http:// or https://, but instead of forcing our customer to add this in the UI, we can simply write a custom modifier that validates the existence of these prefixes and adds them when necessary. To do that we need to create the new field with a `set` property like in the following snippet:
```javascript
    var UserSchema = new Schema({
        ...
        website: {
            type: String,
            set: function(url){
                if(!url){
                    return url;
                } else{
                    if(url.indexOf('http://')!==0 && url.indexOf('https://')!== 0){
                        url = 'https://' + url;
                    }
                    return url;
                }
            }
        },
    })
```

Now every user created will have a properly formed website URL that is modified at creation time. However, what happens if there is already a big collection of user documents? We could migrate the existing data, but when dealing with big datasets, it would have a big performance impact, so instead we can use getter modifiers.

### Custom getter modifiers
Getter modifiers are used to modify existing data before putting the documents to the next layer. For instance, in the previous example, a getter modifier would sometimes be better to change already existing user documents by modifying their website field at query time instead of going over the entire collection and updating each document. To do so we have to change the schema in the following way:
```javascript
    var UserSchema = new Schema({
        ...
        website: {
            type: String,
            set: function(url){
                if(!url){
                    return url;
                } else{
                    if(url.indexOf('http://')!==0 && url.indexOf('https://')!== 0){
                        url = 'https://' + url;
                    }
                    return url;
                }
            }
        },
    });
    UserSchema.set('toJSON', {getters: true});
```

In this example, all we had to do was change the setter modifier to a getter modifier by changing its property in the field. But the most important thing is how we configured the schema using `UserSchema.set()`. This will force Mongoose to include the getters when converting the document to JSON and allows the output of the document to include the getter's behaviour.

Even though modifiers are powerful and useful, they should be used with caution to prevent unpredicted behaviour. It is recommended to see the [Mongoose API documentation](http://mongoosejs.com/docs/api.html) for more information.

## Adding virtual attributes
Sometimes we may want to have derived properties, which are not really present in the document. These properties are called virtual attributes in Mongoose and can be used to address several common requirements. An example of that would be to add a new `fullName` field to the users' collection, which would represent the concatenation of the user's first and last names. To do so, we would have to use the `virtual()` schema method, so a modified user schema would include the following code snippet:
```javascript
UserSchema.virtual('fullName').get(function(){
    return this.firstName + ' ' + this.lastName;
});

UserSchema.set('toJSON', {getters: true, virtuals: true});
```

In this example we added a virtual attribute named fullName to the UserSchema, added a getter method to that virtual attribute and then configured the schema to include virtual attributes when converting the document to JSON.

Virtual attributes also have setters to help save documents as we prefer instead of just adding more field attributes. In this case we could set up a setter to break an input's fullName field into the firstName and lastName fields in the document. To do so, we would have to add the following code to our model:
```javascript
UserSchema.virtual('fullName').get(function(){
    return this.firstName + ' ' + this.lastName;
}).set(function(fullName){
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});
```

Virtual attributes are a great feature of Mongoose, since they allow us to modify document representation as they're being moved through our application's layers without getting persisted to MongoDB.

## Optimizing queries using indexes
As previously discussed, MongoDB supports various types of indexes to optimize query execution. Mongoose also suppports the indexing functionality and even allows us to define secondary indexes.

The basic example of indexing is the `unique` index, which validates the uniqueness of a document field accross a collection. In our example, it is common to keep usernames unique, so in order to tell that to MongoDB, we will need to modify our UserSchema definition as follows:
```javascript
var UserSchema = new Schema({
    ...
    username: {
        type: String,
        trim: true,
        unique: true
    },
    ...
});
```

This tells MongoDB to create a unique index for the username field of the `users` collection. Mongoose also supports the creation of secondary indexes using the `index` property. That way, if we know that our application will use a lot of queries involving the `email` field, we can optimize these queries by creating an e-mail secondary index:
```javascript
var UserSchema = new Schema({
    ...
    email: {
        type: String,
        index: true
    },
    ...
});
```

Indexing is a great feature of Mongo, but we should keep in mind that is might cause some trouble. For example, if we define a unique index on a collection where data is already stored, we might encounter some errors while running the application until we fix the issues with our collection data. Another common issue is Mongoose's automatic creation of indexes when the application starts, a feature that could cause performance issues when running in a production environment.

Next: [Customizing Mongoose Models](mongooseModelCustomization.md)