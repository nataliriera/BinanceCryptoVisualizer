// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars

// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();


//session.config.js
require('./config/session.config')(app)

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
hbs.registerPartials(__dirname + "/views/partials");

// default value for title local
const projectName = "cryptoProject";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
const auth = require("./routes/auth.routes")
const post = require("./routes/posts.routes");
const cryptos = require("./routes/crypto.routes");
const top = require("./routes/top.routes");
const search = require("./routes/search.routes");


app.use("/", index);
app.use("/", auth);
app.use("/",post);
app.use("/", cryptos);
app.use("/", top);
app.use("/", search);



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
