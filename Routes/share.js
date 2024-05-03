const express=require("express");
const router=express.Router();
const auth=require("../Authentication/auth");
const cookie=require("cookie-parser");
router.use(cookie());
const userModel=require("../Models/users");
router.use(express.urlencoded({extended:false}));
router.use(express.json());
router.post("/api/share",auth,async(req,res)=>{
    console.log("in share");

    let document=await userModel.find({email:req.body.email})
    let senderDocument=await userModel.find({_id:req.user._id})
    console.log(document);
    if(req.body.fileType===".jpg" || req.body.fileType===".jpeg"){

        document[0].receivedImage.push({fileData:req.body.imageId,time:Date.now(),senderName:req.user.name,senderId:req.user._id})
        senderDocument[0].shareImage.push({fileData:req.body.imageId,time:Date.now(),receiverName:document[0].name})
    }else if(req.body.fileType===".pdf"){
        document[0].receivedPdf.push({fileData:req.body.imageId,time:Date.now(),senderName:req.user.name,senderId:req.user._id})
        senderDocument[0].sharePdf.push({fileData:req.body.imageId,time:Date.now(),receiverName:document[0].name})

    }else if(req.body.fileType===".mp3"){
        console.log("mp3")
        document[0].receivedSong.push({fileData:req.body.imageId,time:Date.now(),senderName:req.user.name,senderId:req.user._id})
        senderDocument[0].shareSong.push({fileData:req.body.imageId,time:Date.now(),receiverName:document[0].name})
    }else if(req.body.fileType===".mkv" || req.body.fileType===".mp4"){
        document[0].receivedVideo.push({fileData:req.body.imageId,time:Date.now(),senderName:req.user.name,senderId:req.user._id})
        senderDocument[0].shareVideo.push({fileData:req.body.imageId,time:Date.now(),receiverName:document[0].name})

    }
    await senderDocument[0].save();
    await document[0].save();
    res.send(document[0]);
})
module.exports=router;