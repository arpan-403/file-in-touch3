const express=require("express");
const router=express.Router();
const cookie=require("cookie-parser");
const bodyParser=require("body-parser");
const model=require("../Models/users");
// const model1=require("../DataBase/Groups");

router.use(cookie());
// router.use(bodyParser.json());
router.use(express.json());
router.get("/api/login",async(req,res)=>{
    // let document=await model.find();
    // res.json(document);
    res.send("in login");
})
router.post("/api/login",async(req,res)=>{
    console.log("in server");
    console.log(req.body);
    const {email,password}=req.body;
    let document=await model.findOne({email:email});
    console.log(document);
    if(document===null){
        res.status(401).send({error:"invalid userName"});
        
    }else
    {
        let val=await document.checkPassword(password);
        console.log(val);
        if(!val){
            res.status(401).send({error:"invalid password"});
       
        }else{
            let token=await document.generateToken();
            await res.cookie("jwt",token,{
                maxAge:24*60*60*1000
            });
            res.send({id:document._id});
        }
    }
    

})
module.exports=router;