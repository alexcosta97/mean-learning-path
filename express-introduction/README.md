# express-introduction

An example of how to build a simple Express.js appllication

## Utilizing Express
Express works in a very similar way as Connect, since it wraps Connect and adds functionality to it.

It uses the same methods as Connect would to connect middleware to the request handler and to create routes.

The biggest difference in Express is the methods used to send the response back to the client.

In Express we use `res.send()` instead of
```javascript
res.setHeader();
res.end();
```

`res.send()` is an Express wrapper that sets the Content-Type according to the response object type and then sends the response back using the Connect `res.end()` method.

When passing text to `send()`, it will set `Content-Type` to `text/html`. When passing an array or an object to it, it will set `Content-Type` to `application/json`.

## Express Objects
Express presents 3 major objects:

* Application object: Is the instance of the Express applcation and is used to configure the application.
* Request object: Is a wrapped of Node's HTTP request object. Is used to extract information about the current HTTP being handled.
* Response object: Is a wrapper of Node's HTTP response object and is used to set the response data and headers.

### Application Object
The application object contains the following methods:
* `app.set(name, value)`: Is used to set the environment variables that Express will use in its configuration
* `app.get(name)`: Is used to get the environment variables that Express is using in its configuration
* `app.engine(ext, callback)`: Is used to define a given template engine to render certain file types, for example, tell the EJS template engine to use HTML files as templates:
 ```javascript
 app.engine('html', require('ejs').renderFile)
 ```
* `app.locals`: Is used to send application-level variables to all the rendered templates
* `app.use([path], callback)`: used to create an Express middleware to handle HTTP requests sent to the server. Optionally, we can mount middleware to respond to certain paths
* `app.VERB(path, [callback...], callback)`: Is used to define one or more middleware functions to respond to HTTP requests made to a certain path in conjunction with the HTTP verb declared. For example, when we want to respond to requests that are using the `GET` verb, we can assign the middleware using `app.get()`. Same for `POST` except that it is with the `app.post()` method.
* `app.route(path).VERB([callback...], callback)`: Used to define one or more middleware functions to respond to HTTP requests made to a certain unified path in conjunction with multiple HTTP verbs. For example, we could do `app.route(path).get(callback).post(callback)`.
* `app.param([name], callback)`: Used to attach a certain functionality to any request made to a path that includes a certain routing parameter. For example `app.param('userID', callback);`

There are many other application methods that can be used.

### Request object
The request objct also provides a handful of helping methods that contain information about the current HTTP request. The key properties and methods of the request object are the following:
* `req.query`: Is an object containing the parsed query-string parameters
* `req.params`: Is an object containing the parsed routing parameters
* `req.body`: Is an object used to retrieve the parsed request body. This property is included in the `bodyParser()` middleware
* `req.param(name)`: This is used to retrieve a value of a request parameter. The parameter can be a query-string parameter, a routing parameter, or a property from a JSON request body
* `req.path`, `req.host` and `req.ip`: These are used to retrieve the current request path, hostname and remote IP.
* `req.cookies`: Is used in conjunction with the `cookieParser()` middleware to retrieve the cookies sent by the user-agent.

There are many more methods and properties that can be used, but these tend to be the most commonly used.

### Response Object
Is frequently used when developing an Express application because any request sent to the server will be handled and responded using the response object methods. It contains the following key methods:

* `res.status(code)`: Used to set the response HTTP status code
* `res.set(field, [value])`: Used to set the response HTTP header
* `res.cookie(name, value, [options])`: Is used to set a response cookie. The `options` argument is used to pass an object defining common cookie configuration, such as the `maxAge` property.
* `res.redirect([status], url)`: Is used to redirect the request to a given URL. We can add an HTTP status code to the response. When not passing a status code, it will be defaulted to 302 (Found).
* `res.send([body|status], [body])`: Used for non-streaming responses. This method does a lot of background work, such as setting the `Content-Type` and `Content-Length` headers, and responding with the proper cache headers.
* `res.json([status|body], [body])`: Is identical to the `res.send()` when sending an object or array. Most of the times, it is used as syntactic sugar, but sometimes we may need to use it to force a JSON response to non-objects, such as null or undefined.
* `res.render(view, [locals], callback)`: This is used to render a view and send an HTML reponse.

The response object also contains many more methods and peroperties to handle different respnse scenarios.

## External middleware
The Express core is minimal, however it comes with various predefined middleware to handle common web development features. These types of middleware vary in size and functionality and extend Express to provide a better framework support. The popular Express middleware are as follows:
* `morgan`: Is an HTTP request logger middleware
* `body-parser`: Is a body-parsing middleware that is used to parse the request body, and it supports various request types.
* `method-override`: Is a middleware that provides HTTP verb support such as `PUT` or `DELETE` in places where the client doesn't support it
* `compression`: Is a compression middleware that is used to compress the response data using `gzip/deflate`
* `express.static`: Used to serve static files
* `cookie-parser`: Is a cookie-parsing middleware that populates the `req.cookies` object.
* `Session`: Is a session middleware used to support persistent sessions.