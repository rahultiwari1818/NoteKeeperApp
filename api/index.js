require('dotenv').config();
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const connectToMongo = require("./config/database");
connectToMongo();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static('uploads'));
const port = process.env.PORT || 5000;


app.use(cors());
app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));
app.use("/api/files",require("./routes/files"));


app.listen(5000,(req,res)=>{
    console.log("Server Successfully started on Port 5000.!");
});