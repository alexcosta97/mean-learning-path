# Mongoose middleware
Mongoose middleware are functions that can intercept the process of the `init`, `validate`, `save` and `remove` instance methods. It's executed at instance level and there are two types of middleware: `pre` and `post`.

## Pre Middleware
This type of middleware is executed before the operation happens. For example, a pre-save middleware will be execited before saving the document.  That makes `pre` middleware a great to perform more complex validations and default values assignment.

This type of middleware is defined using the `pre()` method of the schema object, so validating the model using a pre middleware would look like this:
```javascript
UserSchema.pre('save', function(next){
    if(...){
        next();
    } else{
        next(new Error('An Error Occured'));
    }
});
```

## Post middleware
Post middleware gets executed after the operation happens. For example, a post-save middleware will be executed after saving the document. This functionality is good for logging application logic.

It is defined using the `post()` method of the schema object, so logging the model's `save()` method using a post middleware would look like this:
```javascript
UserSchema.post('save', function(next){
    if(this.isNew){
        console.log('A new user was created.');
    } else{
        console.log('A user updated their details.');
    }
});
```
In this example, the model's `isNew` property was used to understand whether the model instance was created or updated.

Middleare is great to perform various operations including logging, validation and various data consistency manipulations, and even though it can seem like something hard to grasp at the beginning, it gets pretty simple and logic with practice.

To learn more about middleware see [the middleware documentation](http://mongoosejs.com/docs/middleware.html)

Next: [Mongoose DBRef](mongooseDBRef.md)