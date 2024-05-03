const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const userModel=require("../Models/users");
const imageModel = require("../Models/images");
const pdfModel = require("../Models/pdfs");
const songModel = require("../Models/songs");
const videoModel = require("../Models/videos");
const jwt = require("jsonwebtoken");
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// const cloudinary=require("cloudinary").v2;
// cloudinary.config({ 
//   cloud_name: 'dgulfssbo', 
//   api_key: '637967387663772', 
//   api_secret: '6GMyMV_58C7JPj8nhiEUBNok64w' 
// });

/* IMPORTANT NOTE:---- */


// Import the functions you need from the SDKs you need
//Here we are using Firebase to upload apdf type file because in cloudinary we can't upload any file other than image and video
//for free....but in firebase we can upload any type of document...but to implement it we have the code below..
//Here using multer we create a buffer object for that file which is passed through "uploadBytes"
//Because it doesn't support normal file and before upload we have to change the "metaData" to the "req.file.mimetype".
const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");
// const { log } = require("console");

const firebaseConfig = {
    apiKey: "AIzaSyDjMLJlLFJWAQmNI4OgsmPKC5gV6OmSpgc",
    authDomain: "upload-file-24cdb.firebaseapp.com",
    projectId: "upload-file-24cdb",
    storageBucket: "upload-file-24cdb.appspot.com",
    messagingSenderId: "48050354968",
    appId: "1:48050354968:web:73fe50b42665d90a783c6d",
    measurementId: "G-0QW9SWCE23"
};

// Initialize Firebase

const fireApp = initializeApp(firebaseConfig);
const fireStorage = getStorage(fireApp);


// const storage=multer.diskStorage({
//     destination:function (req,file,cb){
//         cb(null,"./uploads");
//     },
//     filename: function(req,file,cb){
//         cb(null,`${Date.now()}-${file.originalname}`);
//     }
// })

// const upload=multer({
//         storage:storage
//     })
const upload = multer({
    storage: multer.memoryStorage()
})
const uploadPdf = async (name, link, uploaderId, fullPath, fileName,ext,time) => {
    let document = await pdfModel.create({
        name, link,

        path: fullPath,
        fileName,
        fileType:ext,
        time
    })
    console.log(uploaderId);
    document.accessId.push(uploaderId);
    let userDocument=await userModel.find({_id:uploaderId});
    
    userDocument[0].pdfs.push(document._id);
    await userDocument[0].save();
    return document._id;
}
const uploadImage = async (name, link, uploaderId, fullPath, fileName,ext,time) => {
    let document = await imageModel.create({
        name, link,

        path: fullPath,
        fileName,
        fileType:ext,
        time
    })
    console.log(uploaderId);
    document.accessId.push(uploaderId);
    await document.save();
    let userDocument=await userModel.find({_id:uploaderId});

    userDocument[0].images.push(document._id);
    await userDocument[0].save();
    console.log(document);
    console.log(document._id);
    return document._id;
}
const uploadSong = async (name, link, uploaderId, fullPath, fileName,ext,time) => {
    let document = await songModel.create({
        name, link,

        path: fullPath,
        fileName,
        fileType:ext,
        time
    })
    console.log(uploaderId);
    document.accessId.push(uploaderId);
    await document.save();
    let userDocument=await userModel.find({_id:uploaderId});

    userDocument[0].songs.push(document._id);
    await userDocument[0].save();
    return document._id;
}
const uploadVideo = async (name, link, uploaderId, fullPath, fileName,ext,time) => {
    let document = await videoModel.create({
        name, link,

        path: fullPath,
        fileName,
        fileType:ext,
        time
    })
    console.log(uploaderId);
    document.accessId.push(uploaderId);
    await document.save();
    let userDocument=await userModel.find({_id:uploaderId});

    userDocument[0].videos.push(document._id);
    await userDocument[0].save();
    return document._id;
}
router.post("/api/uploads", upload.single("file"), async (req, res) => {
    // console.log(req.file);
    let user = await jwt.verify(req.cookies.jwt, "iamagoodboyandasoftwareengineerwww");
    const newMetadata = {
        // cacheControl: 'public,max-age=300',
        contentType: req.file.mimetype
    };
    const imageRef = ref(fireStorage, `image/${Date.now()}-${req.file.originalname}`);

    const snapshot = await uploadBytes(imageRef, req.file.buffer, newMetadata);
    const link = await getDownloadURL(snapshot.ref);
    //  console.log(imageRef);
    //  console.log(snapshot)
    let ext = path.extname(req.file.originalname);
    let _id;
    const time=Date.now();
    if (ext === ".pdf") {
         _id=await uploadPdf(req.file.originalname, link, user._id, snapshot.metadata.fullPath, snapshot.metadata.name,ext,time)
    } else if (ext === ".jpg" || ext === ".jpeg") {
        
         _id=await uploadImage(req.file.originalname, link, user._id, snapshot.metadata.fullPath, snapshot.metadata.name,ext,time)
    } else if (ext === ".mp3") {
         _id=await uploadSong(req.file.originalname, link, user._id, snapshot.metadata.fullPath, snapshot.metadata.name,ext,time)
    } else if (ext === ".mp4" || ext === ".mkv") {
         _id=await uploadVideo(req.file.originalname, link, user._id, snapshot.metadata.fullPath, snapshot.metadata.name,ext,time)
    }
    console.log(_id);
    res.send({_id,name:req.file.originalname,link,accessId:user._id,path:snapshot.metadata.fullPath,fileName:snapshot.metadata.name,fileType:ext,time:time});
})
module.exports = router;



