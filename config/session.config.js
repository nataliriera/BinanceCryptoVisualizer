const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

module.exports = (app) => {
    app.use(
        session({
            secret:process.env.SECRET,
            resave: true,
            saveUninitialized: false,
            cookie:{
                httpOnly: true,
                maxAge: 60000
            },
            store: MongoStore.create({
                mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/cryptoProject"
            })
        })
    )
}