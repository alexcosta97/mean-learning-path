# express-mvc-pattern

Explanations about how to implement the MVC pattern in an Express application.

Express is pattern agnostic. It doesn't support any predefined syntax or structure as do some other web frameworks.

Applying an MVC pattern inside express means that we can create specific folders where we place our JavaScript files in a certain logical order. All those files are CommonJS modules that function as logical units.

## Application folder structure
JavaScript, in general, is agnostic about the structure of the application as we can easily place our entire application in a single JavaScript file.

The decision in which a project structured is handled is often directly related to the estimated complexity of the application.

### Horizontal folder structure
An horizontal project structure is based on the division of folders and files by their functional role rather than by the feature they implement, which means that all the applcation files are placed inside a main application folder that contains an MVC folder structure.

This also means that there is a single `controllers` folder that contains all of the application controllers, a single `models` folder that contains all of the applcation models, and so on.

The `app` folder is where we keep the Express application logic and is divided into the following folders that represent a separation of functionality to comply with the MVC pattern:
* The `controllers` folder is where we keep our Express application controllers
* The `models` folder is where we keep our Express application models
* The `routes` folder is where we keep our Express application routing middleware
* The `views` folder is where we keep our Express application views.

The `config` folder is where we keep our Express application configuration files. In time we'll add more modules to our application and each module will be configured in a dedicated JavaScript file, which is placed inside this folder. It may contain the following folders and files:
* The `env` folder is where we'll keep our Express application environment configuration files
* The `config.js` file is where we'll configure our Express application
* The `express.js` file is where we'll initialize our Express application.

The `public` folder is where we keep our static client-side files and is divided into the folowing folders that represent a separation of functionality to comply with the MVC pattern:
* The `config` folder is where we keep our Angular application configuration files
* The `controllers` is where we keep our Angular controllers
* The `css` folder is where we keep our CSS files
* The `directives` folder is where we keep our Angular directives
* The `filters` is where we keep our Angular application filters
* The `img` folder is where we keep our images
* The `views` folder is where we keep our Angular application views
* The `application.js` file is where we initialize our Angular application

The `package.json` file is the metadata file that helps us organize our application dependencies
The `server.js` file is the main file of our Node application, and it will load the express file as a module to bootstrap our application.

### Vertical folder structure
A vertical project structure is based on the division of folders and files by the feature they implement, which means each feature has its own autonomous folder that contains an MVC folder structure.

Each feature has its own application-like folder structure. An example feature would be a user management feature that includes the authentication and authorization logic.

It is useful to use this structure for large projects where the number of features is unlimited and each feature includes a substantial amount of files.

## File-naming conventions
The MEAN stack provides a parallel MVC structure for both Express and Angular components, which makes applications often having may files with the same same.

The simplest solution is to add each file's functional role to the file name, so that a feature control file would be named feature.controller.js, a model would be name feature.model.js and so on.