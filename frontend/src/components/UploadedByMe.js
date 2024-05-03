import React, { useContext, useEffect, useState } from 'react'
import { TbShare3 } from "react-icons/tb";
import { MdOutlineDownload } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaFilePdf } from "react-icons/fa6";
import { FaMusic } from "react-icons/fa";

import { MdOutlineOndemandVideo } from "react-icons/md";
import { IoOpenOutline } from "react-icons/io5";

import Share from './Share';
import { contextProvider } from '../context/Context';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Skeleton from './Skeleton';
import Delete from './Delete';



function UploadedByMe({setLoginModal,setShowLogin}) {

    const {filesToShow,setFilesToShow,tempFilesToShow,setTempFilesToShow,searchValue,setSearchvalue,tempSearchedFiles,setTempSearchedFiles,tags,setTags,uploadedData,setUploadedData,updater,setUpdater} = useContext(contextProvider)
    const [shareModal,setShareModal] = useState(false);
    const [deleteModal,setDeleteModal] = useState(false);
    const [path,setPath] = useState("");
    // const [tempFilesToShow,setTempFilesToShow]=useState([]);
    const [imageId,setImageId] = useState();
    const [fileType,setFileType]= useState();
    const [loading,setLoading] = useState(true);
    const location = useLocation();
    const openFile=async(url,name)=>{
  
        var link = document.createElement("a");
        // If you don't know the name or want to use
        // the webserver default set name = ''
        link.setAttribute('download', name);
        link.href = url;
        link.target="_blank";
        document.body.appendChild(link);
        link.click();
        link.remove();
       
      }

      const getUploadedData=async()=>{
        console.log("in uploaded")
        console.log(filesToShow);
        let document;
       try {
        document=await axios.get(`${window.location.origin}/api/uploadedByMe`);
        setShowLogin(false)
        setLoading(false);
       } catch (error) {
        setShowLogin(true)
        setLoginModal(true);
        return
       }
        console.log(document);
        console.log(document.data[0]);
        document.data[0].images.map((item)=>{
    
            setTempFilesToShow((prev)=>[item,...prev].sort((a,b)=>b.time-a.time ))
            setFilesToShow((prev)=>[item,...prev].sort((a,b)=>b.time-a.time ))
        }
        )
        document.data[0].pdfs.map((item)=>{
    
            setTempFilesToShow((prev)=>[item,...prev].sort((a,b)=>b.time-a.time ))
          setFilesToShow((prev)=>[item,...prev].sort((a,b)=>b.time-a.time ))
        })
        document.data[0].songs.map((item)=>{
    
            setTempFilesToShow((prev)=>[item,...prev].sort((a,b)=>b.time-a.time ))
          setFilesToShow((prev)=>[item,...prev].sort((a,b)=>b.time-a.time ))
        })
        document.data[0].videos.map((item)=>{
    
            setTempFilesToShow((prev)=>[item,...prev].sort((a,b)=>b.time-a.time ))
          setFilesToShow((prev)=>[item,...prev].sort((a,b)=>b.time-a.time ))
        })
      }
      
      useEffect(()=>{
        console.log("in useEffect");
        setFilesToShow([]);
         setTempFilesToShow([]);
         getUploadedData();
          
        console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
      },[])
      useEffect(()=>{
        
        if(tags.length==0){
            console.log(searchValue)
       if(searchValue==""){
        setFilesToShow(tempFilesToShow)
        return;
       }
       setFilesToShow(tempFilesToShow)
        setFilesToShow((prev)=>prev.filter((item)=>item.fileName.toLowerCase().includes(searchValue.toLowerCase())));
        setTempSearchedFiles(tempFilesToShow);
        setTempSearchedFiles((prev)=>prev.filter((item)=>item.fileName.toLowerCase().includes(searchValue.toLowerCase())));
        }else{
            if(searchValue==""){
                let newFileData=tempFilesToShow.filter((item)=>{
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
                setFilesToShow(newFileData)
                return;
            }
            setFilesToShow(tempFilesToShow)
            setFilesToShow((prev)=>prev.filter((item)=>item.fileName.toLowerCase().includes(searchValue.toLowerCase())));
        setTempSearchedFiles(tempFilesToShow);
        setTempSearchedFiles((prev)=>prev.filter((item)=>item.fileName.toLowerCase().includes(searchValue.toLowerCase())));
        }
       
        

      },[searchValue])
  return (
    <>
    <div className="rightSection  h-[96%] w-[100%] p-7 lg:w-[81%] my-3 ml-4 mr-4 rounded-lg shadow-xl shadow-slate-500  overflow-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
        {(loading)?<Skeleton/>:<></>}
        { (filesToShow.length==0)?<></> :filesToShow.map((item,id)=>{
            
        return (
          <div className="flex h-[200px] w-[100%] border-2 border-solid shadow-lg shadow-slate-400 rounded-xl relative" id={id} key={id}>
        {
        (item.fileType===".jpg" || item.fileType===".jpeg") ? (
            <>
            <img src={item.link} alt="" className='absolute h-[70%] w-full bg-slate-700 ' onMouseOver={()=>{
              let overlay=document.querySelector(`#overlay${id}`)
              overlay.classList.toggle("hidden")
            }}/>
            </>
          ):(item.fileType===".pdf" ) ? (
            <FaFilePdf className='absolute block h-[70%] w-[100%] text-red-600  p-5' onMouseOver={()=>{
              let overlay=document.querySelector(`#overlay${id}`)
              overlay.classList.toggle("hidden")
            }}/>
          ):(item.fileType==".mp3") ? (
            <FaMusic   className='absolute block h-[70%] w-[100%] text-red-600  p-5' onMouseOver={()=>{
              let overlay=document.querySelector(`#overlay${id}`)
              overlay.classList.toggle("hidden")
            }}/>
          ):(item.fileType==".mkv" || item.fileType==".mp4")?(
            <MdOutlineOndemandVideo   className='absolute block h-[70%] w-[100%] text-red-600  p-5' onMouseOver={()=>{
              let overlay=document.querySelector(`#overlay${id}`)
              overlay.classList.toggle("hidden")
            }}/>
          ):<></>
            
        }
         
        <div id={`overlay${id}`} className='overlay absolute h-[70%] w-full bg-black backdrop-blur-sm bg-opacity-10 hidden' onMouseLeave={()=>{
          let overlay=document.querySelector(`#overlay${id}`)
          overlay.classList.toggle("hidden")
        }}>
        <TbShare3 className='absolute h-6 w-6 text-slate-500 right-0 m-2 cursor-pointer' onClick={()=>{setShareModal(true);
          console.log(item)
          setFileType(item.fileType)
          
          setImageId(item._id)}}/>

        <IoOpenOutline  className='absolute h-6 w-6 text-slate-500 right-0 m-2 bottom-0 cursor-pointer' onClick={()=>openFile(item.link,item.name)}/>
        <RiDeleteBin6Line className='absolute h-6 w-6 text-slate-500 left-0 m-2 top-0 cursor-pointer' onClick={()=>{setDeleteModal(true)
        setFileType(item.fileType)
        setImageId(item._id)
        setPath("uploads")
        }}/>
        

        </div>
        <div className='absolute h-[30%] w-full bottom-0 px-[3px]'>
          <p className='text-[13px] text-center  h-8'><strong>{item.fileName}</strong></p>
          <p className='text-[13px] flex justify-between'><p>uploaded by <strong>you</strong></p>   {new Date(parseInt(item.time)).toLocaleTimeString("en-US")}--{new Date(parseInt(item.time)).toLocaleDateString("en-GB")}</p>
        
        </div>
      </div>
        )
      })}
      {shareModal ? <Share setShareModal={setShareModal} imageId={imageId} fileType={fileType} /> : <></> }
      {deleteModal ? <Delete setDeleteModal={setDeleteModal} imageId={imageId} fileType={fileType} path={path} /> : <></> }
      </div>
    </>
  )
}

export default UploadedByMe