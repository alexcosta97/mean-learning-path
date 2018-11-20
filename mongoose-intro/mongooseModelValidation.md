# Model Validation
One of the major issues when dealing with data marshaling is validation. When users input information to the application, we'll often have to validate that information before passing it on to MongoDB. While we can validate our data at the logic layer. it is more useful to do it at model level. Mongoose supports both predefined validators and more complex custom validators.

Validators are defined at the field level of a document and executed when the document is being saved. If a validation error occurs, the save operation is aborted and the error is passed to the callback.

## Predefined validators
Mongoose supports different types of predefined validators, most of which are type-specific. The basic validation of any application is of course the existence of value. To validate field existence in Mongoose, we'll need to use the `required` property in the field we want to validate. For example, to validate the existance of a `username` field before saving a user we would change the schema in the following way:
```javascript
var UserSchema = new Schema({
    ...
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    ...
});
```

This piece of code prevents the document from being saved if it doesn't contain a username field.

Besides the `required` field validator, Mongoose also includes type-based predefined validators, sich as the `enum` and `match` validators for strings. For instance, to validate an email field, we would change the schema as follows:
```javascript
var UserSchema = new Schema({
    ...
    email: {
        type: String,
        index: true,
        match: /.+\@.+\..+/
    },
    ...
});
```

The usage of a match validators here will make sure the `email` field value matches the given regex expression, thus preventing the saving of any document where the email doesn't conform to the right pattern.

Another example is the `enum` validator, which can help define a set of strings that are available for that field value. Let's say we add a `role` field for the users model. A possible validator would look like this:
```javascript
var UserSchema = new Schema({
    ...
    role: {
        type: String,
        enum: ['Admin', 'Owner', 'User']
    },
    ...
});
```

The preceding condition will allow the insertion of only these three possible strings, and this prevents us from saving the document if the data is anything else than that.

To learn more about predefined validators see [the validation documentation](http://mongoosejs.com/docs/validation.html).

## Custom validators
Mongoose also enables us to define our own custom validators. Defining a custom validator is done using the validate property. The property value should be an array consisting of a validation function and an error message. For example, to validate the length of a user's password, we would change the schema in the following way:
```javascript
var UserSchema = new Schema({
    ...
    password: {
        type: String,
        validate: [
            function(password){
                return password.length >= 6;
            },
            'Password should be longer'
        ]
    },
});
```

The validator will make sure the user's password is at least six characters long, or else it prevents the saving of documents and passes the error message we defined to the callback.

Validation is a powerful feature that allows us to control the model and supply proper error handling, which we can use to help users understand what went wrong.

Next: [Using Mongoose middleware](mongooseMiddleware.md)