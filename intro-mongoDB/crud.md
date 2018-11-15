# MongoDB CRUD operations
Create, read, update and delete (CRUD) operations are the basic interaction that are performed with databases. To execute those operations, Mongo provides various methods.

## Creating a new document
We're already familiar with the basic method of creating a document using the `insert()` method, as was done previously. Besides that method, there are two more methods called `update()` and `save()` to create new objects.

### Creating a document using insert
The most common way to create a document is using the `insert()` method. That method takes a single argument that represents the new document. To insert a new posts, the following command needs to be issued in the MongoDB shell:

```
db.posts.insert({"title":"Second Post", "user":"alice"})
```

### Creating a document using update
The `update()` method is usually used to update an existing document, but it can also be used to create new documents if no document matches the query criteria, using the `upsert` tag. For example, to create the second post with the update method, we would do:

```
db.posts.update({"user":"alice"},
    {"title":"Second Post", "user":"alice"},
    {upsert:true})
```

In the example, MongoDB will look for a post created by `alice` and try to update it. Considering that the post collection doesn't have a post created by Alice and that the `upsert` tag is set to true, Mongo will not find an appropriate document to update and will then create a new document.

### Creating a document using save
Another way of creating a new document is by calling the `save()` method, passing it a document that either doesn't have an id field or has one that doesn't exist in the collection.

```
db.posts.save({"title":"Second Post","user":"alice"})
```

This has the same effect as the `update()` method and will create a new document instead of updating an existing one.

## Reading documents
The `find()` method is used to retrieve a list of documents from a MongoDB collection. Using the method, we can either request for all the documents in a collection or use a query to retrieve specific documents.

### Finding all the collection documents
To retrieve all the documents in the `posts` collection, we should either pass an empty query to the `find()` method or not pass any arguments at all. The two methods are illustrated below:

```
db.posts.find()
db.posts.find({})
```

The two queries are pretty much the same and will return the list of all the documents in the post collection.

### Using an equality statement
To retrieve a specific document, we can use an equality condition query that grabs all the documents with comply with the condition. For instance, to retrieve all the posts created by alice, the following command would be issued in the shell.
```
    db.posts.find({"user":"alice"})
```

### Using query operators
Using an equality statement may not be enough. To build more complex queries, MongoDB supports a variety of query operators. When using them, different sorts of conditions can be looked for. For example, to retrieve all the posts that were created by either alice or bob, we can use the following `$in` operator:
```
    db.posts.find({"user":{$in:["alice", "bob"]}})
```

There are plenty of other query operators on the [MongoDB query selectors documentation](http://docs.mongodb.org/manual/reference/operator/query/#query-selectors).

### Building AND/OR queries
When building a query, there may be a need to use more than one condition. Like in SQL, AND/OR operators can be useed to build multiple condition query statements. To perform an AND query, all that needs to be done is add the properties that need to be checked to the query object. For instance `db.posts.find({"user":"alice", "commentsCount":{$gt: 10}})` finds the posts that were written by alice and that have a comment count that is greater than 10.

An OR query is a bit more complex because it envolves an operator. To understand it better, here is another version of the example where posts written by either bob or alice are found:
```
    db.posts.find({$or[{"user":"alice"},{"user":"bob"}]})
```

## Updating Existing Documents
The `update()` method takes three arguments to update existing documents. The first is the selection criteria that indicates which document to update, the second is the update statement, and the last is the options object.

In the next example, the first argument tells Mongo to find all the posts created by alice, then the second argument tells it to update the title of the posts to "Second Post" and finally the options argument is forcing the operation to be applied to all the documents that it finds:
```
db.posts.update(
    {"user":"alice"},
    {$set: {"title":"Second Post"}},
    {multi:true}
)
```

The update method's default behaviour is to update a single document, so the `multi` property tells the method to update all the documents that meet the criteria.

### Updating Documents using save()
Another way to update documents is by using `save()`. In order to update a document with it, we need to pass it a document that contains a valid `_id` field. It is important to remember that if the `save()` method can't find the object, it will create a new one instead.

## Deleting Documents
To remove documents, Mongo has the `delete()` method. This method can accept up to two arguments. The first is the deletion criteria, and the seccond is a boolean argument that indicates whether to delete multiple documents or not.

### Deleting all documents
To delete all the documents in a collection, all that needs to be done is calling the remove method without any arguments.

It has to be noted, however, that the remove method is different from drop as it will not delete the collection or the indexes, which means that it is a beat practice to use drop instead.

## Deleting multiple documents
To remove multiple documents that match a criteria from a collection, we call the delete method with the right document selector. For example, to delete all the posts made by `alice`, we would use the following command:

```
    db.posts.remove({"user":"alice"})
```

## Deleting a single document
To remove a single document that matches a criteria from a collection, we will need to call `remove()` with a document selector and a booling stating that we only want to delete a single document. For exmaple, to delete the first post created by `alice` we would do:
```
    db.posts.remove({"user":"alice"}, true)
```

Next: [Introduction to Mongoose](../mongoose-intro/README.md)