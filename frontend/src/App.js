
import React, { useContext, useEffect, useState } from 'react';
import {Routes,Route,NavLink, useLocation} from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

import { TbShare3 } from "react-icons/tb";
import { MdOutlineDownload } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaFilePdf } from "react-icons/fa6";
import { FaMusic } from "react-icons/fa";

import { MdOutlineOndemandVideo } from "react-icons/md";

import axios from 'axios';
import Share from './components/Share';
import UploadedByMe from './components/UploadedByMe';
import Home from './components/Home';
import SharedByMe from './components/SharedByMe';
import SharedWithMe from './components/SharedWithMe';
import Context,{contextProvider} from './context/Context';
import Delete from './components/Delete';



function App() {
  const {filesToShow,setFilesToShow,tempFilesToShow,setTempFilesToShow,searchValue,setSearchvalue,tempSearchedFiles,setTempSearchedFiles,tags,setTags,uploadedData,setUploadedData,updater,setUpdater} = useContext(contextProvider)
  const [loginModal,setLoginModal]= useState(false);
  const [registerModel,setRegisterModel]= useState(false);
  const [fileData,setFileData] = useState();
  const [userId,setUserId] = useState();
  const [showLogin,setShowLogin] = useState(true);
  const [deleteModal,setDeleteModal] = useState(false);
  const location= useLocation();
  // const [tempUploadedData,setTempUploadedData]= useState([]);

  const [shareModal,setShareModal] = useState(false);
  const [prevTags,setPrevTags] = useState(["images","pdfs","songs","videos"]);
  const [imageId,setImageId]= useState();
  const [shareWithMe,setShareWithMe] = useState([]);
  const [shareByMe,setShareByMe] = useState([]);
  const [update,setUpdate] = useState(true);
  const uploadFile=(e)=>{
    let selectFile=document.querySelector("#selectFile");
    selectFile.click();
  }
  const selectFile=async(e)=>{
    await setFileData(e.target.files[0]);
    console.log(fileData);
    let uploadBtn = document.querySelector("#uploadBtn");
    uploadBtn.click();
  }
  const handleMenu=()=>{
    let sideBar = document.querySelector(".sideBar");
    sideBar.classList.toggle("hidden")
    sideBar.classList.toggle("absolute")
  }
  const submitForm=async(e)=>{
    e.preventDefault();
    const formData = new FormData();
     console.log(userId);
    formData.append("file", fileData);
    let res=await axios.post(`${window.location.origin}/api/uploads`,formData);
    // setUploadedData((prev)=>[res.data,...prev].sort((a,b)=>b.time-a.time ))
    // setTempUploadedData((prev)=>[res.data,...prev].sort((a,b)=>b.time-a.time ))
    setFilesToShow((prev)=>[res.data,...prev].sort((a,b)=>b.time-a.time ))
  }
  
  const handleCheckBox=(e)=>{
    if(e.target.checked){
      console.log(e.target.name)
      setTags((prev)=>[...prev,e.target.name]);
      setPrevTags((prev)=>prev.filter((item)=>item!=e.target.name))
      
    }else{
      console.log(e.target.name)
      setTags((prev)=>(
        prev.filter((item)=>item!=e.target.name)
      ))
      setPrevTags((prev)=>[...prev,e.target.name]);
      
    }
  }
  
  
  
  useEffect(()=>{
    console.log("in imageId")
    console.log(imageId);

  },[imageId])
  

  
  const changeFilesData=async()=>{
    if(searchValue===""){
      // setTempFilesToShow(filesToShow);
       setFilesToShow(tempFilesToShow);
       setUpdate((prev)=>!prev);
    }else{

      console.log("in tags")
       setFilesToShow((prev)=>tempSearchedFiles);
       console.log(filesToShow);
       setUpdate((prev)=>!prev);
    }
      // console.log(filesToShow);
    
    if(tags.length==0){
      console.log("in tag 0")
      setPrevTags(["images","pdfs","songs","videos"])
      console.log(tempSearchedFiles)
      if(searchValue===""){
        setUpdate((prev)=>!prev);
        return
      }
      setFilesToShow((prev)=>tempSearchedFiles)
      setUpdate((prev)=>!prev);
      
      return
    }
    console.log(filesToShow);
    let newFileData=filesToShow.filter((item)=>{
      if(!item.fileData){
        if((item.fileType===".jpg" || item.fileType===".jpeg")&& tags.includes("images") )  return true;
        if((item.fileType===".pdf" )&& tags.includes("pdfs") )  return true;
        if((item.fileType===".mp3" )&& tags.includes("songs") )  return true;
        if((item.fileType===".mp4" || item.fileType===".mkv")&& tags.includes("videos") )  return true;
      }else{
        if((item.fileData.fileType===".jpg" || item.fileData.fileType===".jpeg")&& tags.includes("images") )  return true;
        if((item.fileData.fileType===".pdf" )&& tags.includes("pdfs") )  return true;
        if((item.fileData.fileType===".mp3" )&& tags.includes("songs") )  return true;
        if((item.fileData.fileType===".mp4" || item.fileData.fileType===".mkv")&& tags.includes("videos") )  return true;
      }
    })
    
  }
  useEffect(()=>{
    console.log("in tags+search")
    
      console.log(filesToShow)
      setFilesToShow((prev)=>prev.filter((item)=>{
      console.log(item);
      if(!item.fileData){
        if((item.fileType===".jpg" || item.fileType===".jpeg")&& tags.includes("images") )  return true;
        if((item.fileType===".pdf" )&& tags.includes("pdfs") )  return true;
        if((item.fileType===".mp3" )&& tags.includes("songs") )  return true;
        if((item.fileType===".mp4" || item.fileType===".mkv")&& tags.includes("videos") )  return true;
      }else{
        if((item.fileData.fileType===".jpg" || item.fileData.fileType===".jpeg")&& tags.includes("images") )  return true;
        if((item.fileData.fileType===".pdf" )&& tags.includes("pdfs") )  return true;
        if((item.fileData.fileType===".mp3" )&& tags.includes("songs") )  return true;
        if((item.fileData.fileType===".mp4" || item.fileData.fileType===".mkv")&& tags.includes("videos") )  return true;
      }
     
    }
    ));
    
  },[update])
  useEffect(()=>{
    console.log(tags);
    changeFilesData();
    
    
    
  },[tags]);
  useEffect(()=>{
    if(location.pathname=="/uploads"){
      document.querySelector(".uploads").classList.add("bg-blue-500");
      document.querySelector(".uploads").classList.add("text-white");
      document.querySelector(".uploads").classList.add("hover:bg-[#72a5f7]");
    
    }else if(location.pathname=="/sharedWithYou"){
      document.querySelector(".sharedWithYou").classList.add("bg-blue-500");
      document.querySelector(".sharedWithYou").classList.add("text-white");
      document.querySelector(".sharedWithYou").classList.add("hover:bg-[#72a5f7]");
    
    }else if(location.pathname=="/sharedByYou"){
      document.querySelector(".sharedByYou").classList.add("bg-blue-500");
      document.querySelector(".sharedByYou").classList.add("text-white");
      document.querySelector(".sharedByYou").classList.add("hover:bg-[#72a5f7]");
    
    }else if(location.pathname=="/"){
      document.querySelector(".home").classList.add("bg-blue-500");
      document.querySelector(".home").classList.add("text-white");
      document.querySelector(".home").classList.add("hover:bg-[#72a5f7]");
    
    }
  
  
    setUpdater(prev=>!prev);
  },[location])
  return (
    <div className='h-screen w-screen relative'>
    <div className='h-screen w-screen'>
    <nav className="w-full h-4 bg-slate-400 flex justify-center items-center py-2 lg:hidden md:hidden">
    <div className="logo h-4 w-40  flex justify-center items-center text-lg font-bold lg:text-2xl">
      <a href="/"><p>file-in-touch</p></a>
    </div>
      </nav>
  <nav className="w-full h-14 bg-slate-400 flex justify-between lg:justify-evenly py-2">
  <FaBars className="h-10 w-10 lg:hidden p-2" onClick={handleMenu}/>

 
    <div className="logo h-10 w-40  flex justify-center items-center text-lg font-bold lg:text-2xl hidden lg:block md:block">
      <a href="/"><p>file-in-touch</p></a>
    </div>
    
    <div className="flex w-[40%] ml-3 lg:mr-0 ">
      <input type="search" className="rounded-s-lg w-full" name="" id="" onChange={(e)=>setSearchvalue(e.target.value)}/>
      <FaSearch className="h-10 w-10 cursor-pointer p-2 mr-0 bg-yellow-500 rounded-e-lg block"/>
      
    </div>
   
      {(showLogin)?<div className='flex mx-3 md:mx-5 lg:flex-row justify-center items-center '>
      <p className='underline my-auto cursor-pointer text-sm lg:text-xl ' onClick={()=>setRegisterModel(true)}>register</p>
      <p className='my-auto mx-3'> / </p>
      <button className=' font-bold h-8 w-19 p-1 lg:h-18 lg:w-20  text-sm lg:text-xl text-center rounded-lg lg:rounded-2xl bg-yellow-500' onClick={()=>setLoginModal(true)}>login</button>
      </div>:<></>}
   
    {
      (showLogin===false) ?<div className="h-10 w-10 flex flex-col relative p-1 mx-2 lg:p-0">
      {/* <img
        className="profile border-red-700 rounded-full"
        src="./images/default_dp.jpg"
        alt=""
      /> */}
      
         <svg className="profile border-red-700 rounded-full bg-gray-200 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
      </svg> 
      

      <div className="profileBox h-[300%] w-[300%] top-full shadow-lg border-solid absolute hidden z-50 bg-white">
        <p>profile</p>
        <p>log out</p>
      </div>
    </div> :<></>
    }
  </nav>
  <section className="flex h-[92%] w-full relative">
  {/* h-[85%] w-[17%]   flex flex-col space-y-4 py-5 shadow-2xl my-2 mx-3 rounded-md border-2 border-solid border-slate-400 mb-5 hidden z-30 */}
    <div className="sideBar h-[85%] w-[45%] lg:h-[85%] lg:w-[17%]   flex flex-col space-y-4 py-5 shadow-2xl my-2 mx-3 rounded-md border-2 border-solid border-slate-400 mb-5 hidden z-30 lg:z-0 lg:block bg-white">
    
    <div className="h-10 w-[85%]  mx-auto rounded-3xl text-center  flex justify-center items-center cursor-pointer">
    <svg className='h-10 w-20' onClick={uploadFile} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
  {/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
  <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
</svg>
      <form action="" className='hidden' onSubmit={submitForm} >
        <input type="file" name="filename" id="selectFile" onChange={selectFile}/>
        <button type="submit" id='uploadBtn'>upload</button>
      </form>
      </div>
     
        <a href="/"  className="home h-10 w-[85%]  mx-auto rounded-3xl text-center hover:bg-slate-200 flex justify-center items-center cursor-pointer" >
          Home
        </a>
      
      <hr className="border-1 border-slate-600 border-dashed mx-5" />
      
      <a exact href="/uploads"  className="uploads text-black focus:text-red-600 h-10 w-[85%]  mx-auto rounded-3xl text-center hover:bg-slate-200 flex justify-center items-center cursor-pointer ">
          Uploaded By You
        </a>
    
      <hr className="border-1 border-slate-600 border-dashed mx-5" />
      
      <a href="/sharedByYou" element={<SharedByMe/>} className="sharedByYou text-black focus:text-red-600 h-10 w-[85%]  mx-auto rounded-3xl text-center hover:bg-slate-200 flex justify-center items-center cursor-pointer ">
      Shared by you
        </a>
    
      
      <hr className="border-1 border-slate-600 border-dashed mx-5" />
      
      <a href="/sharedWithYou" element={<SharedWithMe/>}  className="sharedWithYou text-black focus:text-red-600 h-10 w-[85%]  mx-auto rounded-3xl text-center hover:bg-slate-200 flex justify-center items-center cursor-pointer ">
      Shared with you
        </a>
      
      <hr className="border-1 border-slate-600 border-dashed mx-5" />
      <div className="tags text-center">
        <p className="pb-5">select your tages</p>
        <div className="flex justify-center flex-wrap gap-1 p-2">
        {
          tags.length===0 ?<></>
          : tags.map((item)=>(
            <>
              <input type="checkbox" name={item} className='hidden' checked={true}  id={`tags${item}`} onChange={handleCheckBox} />
          <div className="h-8 w-20 bg-blue-500 text-center rounded-2xl font-bold text-white cursor-pointer " id={Date.now()} onClick={(e)=>{
           let images= document.querySelector(`#tags${item}`);
           images.click();
            
          }}>
            {" "}
            
            {item}
          </div>
            </>
          ))
        }
          {
            prevTags.length==0?<></>:
            prevTags.map((item)=>(
              <>
                <input type="checkbox" name={item} className='hidden' checked={false} id={`prevTags${item}`} onChange={handleCheckBox} />
          <div className="h-8 w-20 bg-slate-300 text-center rounded-2xl hover:bg-slate-400 cursor-pointer " id={Date.now()} onClick={(e)=>{
           let images= document.querySelector(`#prevTags${item}`);
           images.click();
            
          }}>
            {" "}
            
            {item}
          </div>
              </>
            ))
          }
          
          
        </div>
      </div>
    </div>
    {/* flex flex-wrap gap-10  justify-start items-start */}
    
      {/* <UploadedByMe uploadedData={uploadedData}/> */}
          <Routes>
            <Route exact path='/' element={<Home setShowLogin={setShowLogin}/>} onChange={()=>setUpdater(prev=>!prev)}/>
            <Route exact path='/uploads' element={<UploadedByMe setLoginModal={setLoginModal} setShowLogin={setShowLogin} setDeleteModal={setDeleteModal}/>} onChange={()=>setUpdater(prev=>!prev)}/>
            <Route exact path='/sharedByYou' element={<SharedByMe setLoginModal={setLoginModal} setShowLogin={setShowLogin}/>} onChange={()=>setUpdater(prev=>!prev)}/>
            <Route exact path='/sharedWithYou' element={<SharedWithMe setLoginModal={setLoginModal} setShowLogin={setShowLogin}/>} onChange={()=>setUpdater(prev=>!prev)}/>
          </Routes>
   
  </section>
</div>
{registerModel ? <Register setRegister={setRegisterModel}/> : <></>}
{loginModal ? <Login setLogin={setLoginModal} setUserId={setUserId} setRegisterModel={setRegisterModel}/> : <></>}
{shareModal ? <Share setShareModal={setShareModal} imageId={imageId} /> : <></> }
{deleteModal ? <Delete setDeleteModal={setDeleteModal} imageId={imageId}  /> : <></> }
</div>
    
  );
}

export default App;
