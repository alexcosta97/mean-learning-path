# MongoDB shell
To interact with Mongo, we'll use a shell. The MongoDB shell is a command-line tool that enables the execution of different operations using a JavaScript syntax query language.

In order to explore the different parts of MongoDB, we first need to start the MongoDB shell by running the `mongo` executable.

When we launch the shell it tells us the current shell version and that is connected to the `test` database. That database is the default database.

## MongoDB databases
Each MongoDB server instance can store several databases. Unless specifically defined, the MongoDB shell will automatically connect to the `test` database. To switch to another database called `mean` we have to execute the following command:
```sql
use mean
```

In MongoDB, databases and collections are lazily created when the first document is created, which means that there is no need to create the database before using it. If we want to list all the other databases in the current server, we have to execute the following command:
```sql
show dbs
```

This shows a list of all the currently available databases that have at least one document stored.

## MongoDB collections
A MongoDB collection is a list of MongoDB documents and is the equivalent of a relational database table.

A collection is created when the first document is being inserted. Unlike a table, a collection doesn't enforce any type of schema and can host different structed documents.

To perform operations on a collection, we'll need to use the collection methods. We can now create a `posts` collection and insert the first post. In order to do this, we can execute the following command in the shell:
```sql
db.posts.insert({"title":"First Post", "user":"bob"})
```

After executing the preceding command, it will automatically create the posts collection and insert the first document. To retrieve the collection documents, we can execute the following command in the shell:

```sql
db.posts.find()
```

If the output shows a BSON object with an `_id` and the rest of the information inside the document, then it means that the first document has been successfully created.

To show all the available collections, we can use the following command:
```
show collections
```

The MongoDB shell will output the list of available collections, which in our case are the `posts` collection and another collection called `system.indexes`, which holds the list of our database indexes.

To delete the `posts` collection, we will need to execute the `drop()` command as follows:
```
db.posts.drop()
```

The sheel will inform that the collection was dropped by responding with a `true` output.

Next: [MongoDB CRUD operations](crud.md)