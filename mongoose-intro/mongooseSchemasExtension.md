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