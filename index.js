const { urlencoded } = require("body-parser");
const express = require("express");
const connect = require("./db_connection/connect.js");
const bodyParser = require('body-parser');
const url = require('./routes/url');
const handler = require("./routes/handler")

app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


connect("mongodb://localhost:27017/url_project").then(()=>{
    app.listen("8000",()=>{
        console.log("listening at port 8000");
    });
});

app.use("/shorten",url);
app.use("/",handler);



