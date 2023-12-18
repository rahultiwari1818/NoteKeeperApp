const mongoose = require("mongoose");
const url = process.env.DB_URL;


const connectToMongo = () =>{
    mongoose.connect(url);
}


module.exports = connectToMongo;