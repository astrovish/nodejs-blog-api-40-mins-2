const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes")
const bodyParser = require("body-parser");

// creating an express application
const app = express();

// configuring .env file path
dotenv.config({path: "./config/config.env"})

// connecting with database
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(result => {
    console.log('Application successfully connected with database');
})
.catch(err => {
    console.log(`Following error occured while connecting with database: ${err}`);
})

// listening application on assigned port
const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
    console.log(`Application is up and running on port: ${PORT}`);
})

// support parsing for application/x-www-form-urlencoded type post data
app.use(bodyParser.urlencoded({extended: true}))

// support parsing for application/json type post data
app.use(bodyParser.json());

// blog routes
app.use('/api/v1/blogs', blogRoutes);