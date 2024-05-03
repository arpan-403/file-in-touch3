const express=require("express");
const router=express.Router();
const cookie=require("cookie-parser");
const auth=require("../Authentication/auth");
const bodyParser=require("body-parser");
const model=require("../Models/users");
// const model1=require("../DataBase/Groups");

router.use(cookie());
// router.use(bodyParser.json());
router.use(express.json());
router.get("/api/isAuthenticate",auth,async(req,res)=>{
    // let document=await model.find();
    // res.json(document);
    res.send(req.user);
})

module.exports=router;