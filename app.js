const express = require("express");
const mongoose = require("mongoose");
const logger = require("./middlewares/logger")
const AuthPath = require("./router/Auth");
const BookPath = require("./router/book");
const path = require("path");
const connectDB = require("./config/db")
const app = express();
// connect to mongos
connectDB();


app.use(express.static(path.join(__dirname,"/images"))); 
//apply middleware
app.use(logger);
app.use("/api/Auth",AuthPath);
app.use("/api/book",BookPath);



const PORT = 5000;
// initialize
app.listen(PORT, () => console.log('The servet is work good ' + PORT));

