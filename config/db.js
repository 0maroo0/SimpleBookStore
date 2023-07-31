const mongoose = require("mongoose");


async function connectDB(){
    try{
      await  mongoose.connect("mongodb://127.0.0.1:27017/freeBook",{}); // Replace 'mydatabase' with your actual database name
        console.log("Connected to MongoDB");
    }catch(e){
        console.error("Failed to connect to MongoDB:", e);
    }
}

module.exports = connectDB;
