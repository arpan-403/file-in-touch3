const jwt =require("jsonwebtoken");
const model=require("../Models/users");
async function auth(req,res,next){
    console.log("in auth")
    console.log(req.cookies.jwt);
    if(req.cookies.jwt==null){
        console.log("in auth")
        req.user=null
        res.status(404).send({error:"error"});
        return;
    }
    let user=await jwt.verify(req.cookies.jwt,"iamagoodboyandasoftwareengineerwww");
    if(user==null){
        req.user=null;
        res.send(false);
        return;
    }
    console.log(user);
    req.user=await model.findOne({_id:user._id});
    if(req.user==null){
        res.status(404).send({error:"error"});
        return;
    }
    req.userName=req.user.name;
    console.log(user._id);
    next();
}
module.exports=auth;