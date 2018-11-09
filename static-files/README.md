# Serving Static Files
In most web applications, at one point or another, there will be a need to serve static files. Fortunately, Express comes with the `express.static()` middleware, which provides this feature.

To add static file support, the following code needs to be added to the `config/express.js` file in a project:
```javascript
    app.use(express.static('pathToStaticFilesFolder'));
```

The static middleware takes one argument to determine the location of the static files folder. Normally, this call would be placed below the call for the routing file. This matters because if it were above it, Express would first look for HTTP request paths in the static files folder, and this would make the response slower as it would have to wait for a filesystem I/O operation.

To test the static middleware, you can add an image file called `logo.png` to the static folder and then make the following changes on the index view template:
```html
<!DOCTYPE html>
<html>
    <head>
        <title><%= title%></title>
    </head>
    <body>
        <img src="img/logo.png" alt="Logo">
        <h1><%= title %></h1>
    </body>
</html>
```

All that is left to do is start the Express application and watch the file being served!