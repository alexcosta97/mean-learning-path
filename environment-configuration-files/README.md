# Environment Configuration Files

During the application development, there will often be a need to configure third-party modules to run differently in various environments. For instance, when connecting to the MongoDB server, there will probably be different connection strings in the development and production environments.

Doing so in the current setting will probably cause the code to be filled with if statements, which makes it harder to maintain. To solve this issue, a set of environment configuration files that hold these properties can be configured.

Those files can be put under `config/env` folder.

Inside that folder you can create your configuration files with the following name `[dev_Environment].js`.

An example of the code for a development environment configuration file would be:
```javascript
module.exports ={
    // Development configurations here
};
```

Then, back on the `config` folder, you can create another javascript file, this time called `config.js`, which will load the right environment configuration file for the environment that the application is on at the minute:
```javascript
module.exports = require('./env/' + process.env.NODE_ENV + '.js');
```