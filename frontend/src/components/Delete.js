import axios from 'axios';
import React, { useContext, useRef, useState } from 'react'
import { ImCross } from "react-icons/im";
import { useLocation } from 'react-router-dom';
import { contextProvider } from '../context/Context';

function Delete({setDeleteModal,imageId,fileType,path}) {
    const {filesToShow,setFilesToShow,tempFilesToShow,setTempFilesToShow,searchValue,setSearchvalue,tempSearchedFiles,setTempSearchedFiles,tags,setTags,uploadedData,setUploadedData,updater,setUpdater} = useContext(contextProvider)
    const modalRef= useRef();
    const location = useLocation();
    const closeModel=(e)=>{
        if(modalRef.current===e.target)  setDeleteModal(false);
    }
    const handleDelete=async()=>{
        let document;
        console.log(filesToShow);
        const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
        try {
            document= await axios.post(`${window.location.origin}/api/delete`,{imageId,fileType,path},config);
        } catch (error) {
            console.log(error);
        }
        if(path=="uploads"){
            setFilesToShow((prev)=>prev.filter((item)=>item._id!=imageId));
        setTempFilesToShow((prev)=>prev.filter((item)=>item._id!=imageId))
        }else{
            setFilesToShow((prev)=>prev.filter((item)=>item.fileData._id!=imageId));
        setTempFilesToShow((prev)=>prev.filter((item)=>item.fileData._id!=imageId))
        }
        setDeleteModal(false);
        // window.location.reload();
    }
  return (

    <div ref={modalRef} className='flex fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm justify-center items-center' onClick={closeModel}>
            
            <div className='relative text-center flex-col justify-evenly items-center h-[50%] w-[60%] lg:h-[50%] lg:w-[30%] bg-white rounded-md border-2 border-slate-500 border-solid' >
            <ImCross className='absolute right-0 -top-5' onClick={()=>setDeleteModal(false)}/>
                <p className='pt-10 text-wrap'>Are you want to  delete this item ?</p>
                <div className='flex justify-evenly w-full h-[20%]'>
                <button type="button" className="text-black bg-slate-200 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm my-5 px-8 py-2.5 text-center mb-2 " onClick={()=>setDeleteModal(false)}>no</button>
                <button type="button" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm my-5 px-8 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={handleDelete}>yes</button>
                </div>                  
            </div>
        </div>
  )
}

export default Delete