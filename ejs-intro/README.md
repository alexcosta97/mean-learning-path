# Rendering Views with Express
Rendering views is a common feature of web frameworks. It usually works by passing the data to a template engine that then renders the final view.

In the MVC pattern, the controller uses the model to retrieve the data portion and the view template to render the HTML output.

The Express extendable approach allows the usage of many template engines to achieve this functionality.

Express has two methods for rendering views: `app.render()`, which is used to render the view and then pass the HTML to a callback function, and the more common `res.render()`, which renders the view locally and sends the HTML as a response.

`res.sender()` gets used more frequently because we usually want to output the HTML as a response. However, if we'd like an application to send HTML e-mails, we'd probably use `app.render()`.

## Configure the view system
To use the Express view system, we first need to install the EJS module.
On the `package.json` file, under dependcies, add:
`"ejs": "~2.5.8"` or whatever the latest release is.

When you finish adding the dependency to the project, go to your `config/express.js` to configure the express module to add the view engine:
```javascript
    app.set('views', './app/views');
    app.set('view engine', 'ejs');
```

These instructions set the Express application to store the folder in which the views are stored and the view engine that is used.

## Rendering EJS views
EJS views consist of HTML code mixed with EJS tags. EJS templates reside in the app/vies folder and have the .ejs extension.

When using the `res.sender()` method, the engine looks for the template in the views folder and then renders the HTML output.

Here's an example of a view in a file called `index.ejs`:
```html
<!DOCTYPE html>
<html>
    <head>
        <title><%= title%></title>
    </head>
    <body>
        <h1><%= title%></h1>
    </body>
</html>
```

In this example the `<%= %>` tags are the way to tell the EJS template engine where to render the tempate variables, which in the case of this template, owuld be the `title` variable.

All that is left to do is configure the controller to render this template and automatically output it as an HTML response. Inside a controller file, the operation to do so would look like this:
```javascript
    exports.render = function(req, res){
        res.render('index'.{
            title: 'Hello World!'
        })
    };
```

EJS views are simple to maintain and provide and easy way to create application views. However, in the MEAN stack, most of the HTML rendering is done with Angular, so EJS won't be explored to a great extent.