const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)

const schema = mongoose.Schema({
    fileName:{
        type:String,
        required:true
    },
    link:String,
    accessId:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        }],
      
    
    path:String,
    fileName:String,
    fileType:String,
    time:{
        type:String,
        default:Date.now()
    }
})

const model=new mongoose.model("videos",schema);
module.exports=model;