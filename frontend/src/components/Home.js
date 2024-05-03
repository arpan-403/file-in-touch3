import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Home({setShowLogin}) {
    const [name,setName] = useState("");
    const getUserData=async()=>{
        let document;
       try {
        document=await axios.get(`${window.location.origin}/api/isAuthenticate`);
        setShowLogin(false)

       } catch (error) {
        setShowLogin(true)

        return
       }
       setName(document.data.name);
    }
    useEffect(()=>{
        getUserData();
    },[])
  return (
    <div className=' h-[96%] w-[100%] rounded-lg shadow-xl shadow-slate-500 lg:w-[81%] p-10 my-3 ml-4 mr-4 text-6xl lg:text-8xl text-center flex flex-col justify-center items-center'>
        
        <p className='mb-10'>Hi , <span className='font-bold'>{name}</span></p>
        <p className=''>Upload files to keep in touch</p>
    </div>
  )
}

export default Home