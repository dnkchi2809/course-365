const express = require("express");

const app = express();

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

//Models
const courseModel = require("./app/models/courseModel");

//Routers
const router = require("./app/routes/couseRouter");

const path = require("path");

app.use(bodyParser.json({limit: '50mb'}));

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}))

const port = 8000;

mongoose.connect("mongodb://localhost:27017/CRUD_Course365", (err) => {
    if(err){
        throw err;
    }

    console.log("Connect MongoDB CRUD_Course365 successfully")
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/app/views/index.html"))
});

app.use("/", router);

app.use(express.static(__dirname + "/app/views"));

app.listen(port, () => {
    console.log("Chạy trên cổng " + port)
})
