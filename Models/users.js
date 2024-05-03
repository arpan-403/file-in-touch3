const mongoose = require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
mongoose.connect(process.env.MONGO_URL)
 
const schema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    images:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"images"
    }],
    pdfs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"pdfs"
    }],
    videos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"videos"
    }],
    songs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"songs"
    }],
    receivedImage:[
        {
            fileData:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"images"
            },
            time:String,
            senderName:String,
            senderId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"users"
            }
        }
    ],
    receivedPdf:[
        {
            fileData:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"pdfs"
            },
            time:String,
            senderName:String,
            senderId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"users"
            }
        }
    ],
    receivedSong:[
        {
            fileData:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"songs"
            },
            time:String,
            senderName:String,
            senderId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"users"
            }
        }
    ],
    receivedVideo:[
        {
            fileData:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"videos"
            },
            time:String,
            senderName:String,
            senderId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"users"
            }
        }
    ],
    shareImage:[
        {
            fileData:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"images"
            },
            time:String,
            receiverName:String
        }
    ],
    sharePdf:[
        {
            fileData:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"pdfs"
            },
            time:String,
            receiverName:String
        }
    ],
    shareSong:[
        {
            fileData:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"songs"
            },
            time:String,
            receiverName:String
        }
    ],
    shareVideo:[
        {
            fileData:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"videos"
            },
            time:String,
            receiverName:String
        }
    ],
    tokens:[{
        token:{
            type:String
        }
    }]
})

schema.methods.encryptPassword=async function(){
    let newPassword=await bcrypt.hash(this.password,11);
    // console.log(this.email);
    
    await model.updateOne({_id:this._id},{$set:{password:newPassword}});
    
}
schema.methods.checkPassword=async function(password){
    console.log("in check");
    return await bcrypt.compare(password,this.password);
}
schema.methods.generateToken=async function(){
    let token=await jwt.sign({_id:this._id},"iamagoodboyandasoftwareengineerwww",);
    console.log(token);
    this.tokens.push({token:token});
    await model.updateOne({_id:this._id},{$set:{tokens:this.tokens}});
    return token;
}

const model = new mongoose.model("users",schema);
module.exports=model;