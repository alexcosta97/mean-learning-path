# connect-simple-server

Example of building a simple server using the connect module in Node.js.

## Connect
Connect creates a server using
```javascript
var app = connect() method.
```

## Middleware
Middleware are functions that receive the information of the request and the response, as well as information about the next middleware to be executed (if necessary).

Example:
```javascript
function test(req, res, next){
    console.log(req.url);
    res.setHeader('Context-Type', 'text/html');
    next();
}
```

They get registered by using `app.use(test);`

Connect will run the middleware functions in the order that they are registered. The first to be registered will be the first to be executed. 

If there is no `res.end()` call in any of the middleware functions then the request hangs forever and never gets a response.

## Mounting Middleware
Mounting enables to determine which request path is required for the middleware function to be executed.

To mount a middleware to a certain request we use `app.use('/route', middleware);` instead of the normal `app.use(middleware)`.