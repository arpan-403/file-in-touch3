const express=require("express");
const router=express.Router();
const auth=require("../Authentication/auth");
const cookie=require("cookie-parser");
router.use(cookie());
const userModel=require("../Models/users");
router.use(express.urlencoded({extended:false}));
router.use(express.json());
router.post("/api/delete",auth,async(req,res)=>{
    console.log("in delete");
    let {imageId} =req.body;
    // let document=await userModel.find({email:req.user.email})
    let document=await userModel.find({_id:req.user._id})
    console.log(document);
    if(req.body.fileType===".jpg" || req.body.fileType===".jpeg"){
        if(req.body.path==="uploads"){
            
            let temp=document[0].images.filter((item)=>item!=imageId);
            document[0].images=temp;
        }else if(req.body.path==="shareWithMe"){
            console.log(req.body);
            document[0].receivedImage=document[0].receivedImage.filter((item)=>item.fileData!=imageId)
        }
        else{

            document[0].shareImage=document[0].shareImage.filter((item)=>item.fileData!=imageId)
        }
    }else if(req.body.fileType===".pdf"){
        if(req.body.path==="uploads"){
            
            let temp=document[0].pdfs.filter((item)=>item!=imageId);
            document[0].pdfs=temp;
        }else if(req.body.path==="shareWithMe"){
            console.log(req.body);
            document[0].receivedPdf=document[0].receivedPdf.filter((item)=>item.fileData!=imageId)
        }
        else{

            document[0].sharePdf=document[0].sharePdf.filter((item)=>item.fileData!=imageId)
        }

    }else if(req.body.fileType===".mp3"){
        if(req.body.path==="uploads"){
            
            let temp=document[0].songs.filter((item)=>item!=imageId);
            document[0].songs=temp;
        }else if(req.body.path==="shareWithMe"){
            console.log(req.body);
            document[0].receivedSong=document[0].receivedSong.filter((item)=>item.fileData!=imageId)
        }
        else{

            document[0].shareSong=document[0].shareSong.filter((item)=>item.fileData!=imageId)
        }
    }else if(req.body.fileType===".mkv" || req.body.fileType===".mp4"){
        if(req.body.path==="uploads"){
            
            let temp=document[0].videos.filter((item)=>item!=imageId);
            document[0].videos=temp;
        }else if(req.body.path==="shareWithMe"){
            console.log(req.body);
            document[0].receivedVideo=document[0].receivedVideo.filter((item)=>item.fileData!=imageId)
        }
        else{

            document[0].shareVideo=document[0].shareVideo.filter((item)=>item.fileData!=imageId)
        }

    }
    
    await document[0].save();
    res.send(document[0]);
})
module.exports=router;