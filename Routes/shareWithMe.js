const express=require("express");
const router=express.Router();
const auth=require("../Authentication/auth");
const cookie=require("cookie-parser");
router.use(cookie());
const model=require("../Models/users");
router.use(express.urlencoded({extended:false}));
router.use(express.json());
router.get("/api/shareWithMe",auth,async(req,res)=>{
    console.log("in server");
    
    let document=await model.find({_id:req.user._id}).populate({
        path: 'receivedImage.fileData',
        model: 'images'
    }).populate({
        path: 'receivedPdf.fileData',
        model: 'pdfs'
    }).populate({
        path: 'receivedSong.fileData',
        model: 'songs'
    }).populate({
        path: 'receivedVideo.fileData',
        model: 'videos'
    })
    res.send(document);
})
module.exports=router;