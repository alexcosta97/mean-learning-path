# Mongoose DBRef
Even though MongoDB doesn't support joints, it supports the reference of a document to another using a convention named DBRef. Mongoose includes support for DBRefs using the `ObjectID` schema type and the use of the `ref` property. Mongoose also supports the population of the parent document with the child document when querying the database.

To understand this better, let's say we create another schema for blog posts called PostSchema. Because a user authors a blog post, PostSchema will contain an author field that will be populated by a User model instance. So, a PostSchema will have to look like the following:

```javascript
var PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Post', PostSchema);
```

In the ref property we tell Mongoose that the author field will use the `User` model to populate the value.

Using this new schema is simple. To create a new blog post, we need ot retrieve or create an instance of the User model, create an instance of the Post model, and then assign the post author property with the user instance. An example of this should be as follows:
```javascript
var user = new User();
user.save();

var post = new Post();
post.author = user;
post.save();
```

Mongoose will create a DBRef in the MongoDB post document and will later use it to retrieve the referenced document.

Since the DBRef is only an ObjectID reference to a real document, Mongoose will have to populate the post instance with the user instance. To do so, we have to tell Mongoose to populate the post object using the `populate()` method when retrieving the document. For instance, a `find()` method that populates the author property would look like this:
```javascript
Post.find().populate('author').exec(function(err, posts){
    ...
});
```

Mongoose will then retrieve all the documents in the posts collection and populate their author attribute.

DBRefs are an awesome feature of MongoDB. Mongoose's support for this feature enables us to calmly rely on object references to keep the model organized.

To find out more about DBRefs, see [the populate documentation](http://mongoosejs.com/docs/populate.html)

Next: [User Authentication Introduction](../user-authentication/README.md)