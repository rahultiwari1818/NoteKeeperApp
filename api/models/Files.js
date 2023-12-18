const mongoose = require("mongoose");

const {Schema} = mongoose;

const FilesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user",
    },
    filePath:{
        type:String,
        required:true
    },
    OriginalFileName:{
        type:String,
        required:true,
    },
    extension:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

const Files =  mongoose.model("files",FilesSchema);
module.exports = Files;