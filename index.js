require('dotenv').config()
const express=require("express");
const app=express();
var cors = require('cors')
const path = require("path");
app.use(cors())
const PORT=process.env.PORT || 5000
const login=require("./Routes/login");
const isAuthenticate=require("./Routes/isAuthenticate");
const register=require("./Routes/register");
const uploads=require("./Routes/uploads");
const uploadedByMe=require("./Routes/uploadedByMe");
const share=require("./Routes/share");
const Delete=require("./Routes/delete");
const shareWithMe=require("./Routes/shareWithMe");
const shareByMe=require("./Routes/shareByMe");
// app.use("/uploads",express.static("uploads"));
app.use(login);
app.use(isAuthenticate);
app.use(register);
app.use(uploads);
app.use(uploadedByMe);
app.use(share);
app.use(Delete);
app.use(shareWithMe);
app.use(shareByMe);
// app.get("/",(req,res)=>{
//     res.send("in server");
// })
app.get("/", (req, res) => { app.use(express.static(path.resolve(__dirname, "frontend", "build"))); res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")); });
app.get("/uploads", (req, res) => { app.use(express.static(path.resolve(__dirname, "frontend", "build"))); res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")); });
app.get("/sharedByYou", (req, res) => { app.use(express.static(path.resolve(__dirname, "frontend", "build"))); res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")); });
app.get("/sharedWithYou", (req, res) => { app.use(express.static(path.resolve(__dirname, "frontend", "build"))); res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")); });
app.get("/delete", (req, res) => { app.use(express.static(path.resolve(__dirname, "frontend", "build"))); res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")); });

app.listen(PORT,()=>console.log("server is connected...."));