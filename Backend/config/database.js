// import mongoose from "mongoose";

const mongoose = require("mongoose");


const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_SERVER);
        console.log("database connected");
    } catch (error) {
        console.log("errpr om db");
    }
}
module.exports = dbConnection