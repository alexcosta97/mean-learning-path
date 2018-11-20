# Model Customization
## Defining custom model methods
Mongoose models are pretty packed with both static and instance predefined methods, some of which have already been used. However, Mongoose lets us define our own custom methods to empower our models, giving us a modular tool to separate our application logic properly.

### Defining custom static methods
Model static methods give us the liberty to perform model-level operations, such as adding extra `find` methods. For instance, we could search users by their username. We could of course define that in the controller, but that wouldn't be the right place for it.

To add a static method, we will need to declare it as a member of our schema's `statics` property. In our case, adding a `findOneByUsername()` method would look like the following:
```javascript
UserSchema.statics.findOneByUsername = function(username, callback){
    this.findOne({username: new RegExp(username, 'i')}, callback);
};
```

This method uses the model's findOne method to retrieve a user's document that has a certain username. Using the new method would be similar to using a standard static method by calling it directly from the `User` model as follows:
```javascript
User.findOneByUsername('username', function(err, user){
    ...
});
```

We can of course come up with many other static methods, and we shouldn't be afraid to add them as needed when developing applications.

## Defining custom instance methods
Static methods are great, but what if we need methods that perform instance operations? Mongoose offers support for those too, helping us sliming down our code base and properly reuse our application code. To add an instance method, we will need to declare it as a member of our schema's `methods` property. Let's say we want to validate our user's password with an `authenticate()` method. Adding this method would then be similar to the following code:
```javascript
UserSchema.methods.authenticate = function(password){
    return this.password === password;
};
```

This allows us to call the `authenticate()` method from any User model instance as follows:
```javascript
user.authenticate('password');
```
As we can see, defining custom model methods is a great way to keep our project properly organized while making reuse of common code.

Next: [Model Validation](mongooseModelValidation.md)