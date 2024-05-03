const express=require("express");
const router=express.Router();
const cookie=require("cookie-parser");
router.use(cookie());
const model=require("../Models/users");
router.use(express.urlencoded({extended:false}));
router.use(express.json());
router.post("/api/register",async(req,res)=>{
    console.log("in server");
    console.log(req.body);
    const {name,email,password}=req.body;
    let document=new model({
        name,email,password
    })
    await model.insertMany(document);
    await document.encryptPassword();
    let token=await document.generateToken();
    await res.cookie("jwt",token,{
        maxAge:24*60*60*1000
    });
    res.send({id:document._id});
})
module.exports=router;