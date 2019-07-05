const path = require("path");
//this will refer to the main module which started our app
module.exports = path.dirname(process.mainModule.filename);
