import React, { useReducer, useRef, useState } from 'react'
import { ImCross } from "react-icons/im";
import axios from "axios"
function Register({setRegister}) {
    const modalRef= useRef();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [name,setName] = useState();
    const closeModel=(e)=>{
        if(modalRef.current===e.target){

           
            setRegister(false);
        }
        
    }
    const submitForm=async(e)=>{
        e.preventDefault();
        const config = {
            headers:{
              "Content-type": "application/json",
            },
          };
       let res= await axios.post(`${window.location.origin}/api/register`,{email,name,password},config)
       console.log(res);
       setRegister(false);
       window.location.reload();
    }
  return (
    
        <div ref={modalRef} className='flex fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm justify-center items-center' onClick={closeModel}>
            
            <div className='relative h-[50%] w-[60%] lg:h-[50%] lg:w-[30%] bg-white rounded-md border-2 border-slate-500 border-solid' >
            <ImCross className='absolute right-0 -top-5' onClick={()=>setRegister(false)}/>
                <form className='flex flex-col p-10' action="" onSubmit={submitForm}>
                    <label htmlFor="email">Email</label>
                    <input className='my-2 rounded-md h-10 border-slate-300 border-solid border-2' type="text" id='email' onChange={(e)=>setEmail(e.target.value)} />
                    <label htmlFor="name">Name</label>
                    <input className='my-2 rounded-md h-10 border-slate-300 border-solid border-2' type="text" id='name' onChange={(e)=>setName(e.target.value)}/>
                    <label  htmlFor="password">Password</label>
                    <input className='my-2 rounded-md h-10 border-slate-300 border-solid border-2' type="text" id='password' onChange={(e)=>setPassword(e.target.value)}/>
                    <button type="submit"  className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm my-5 px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">register</button>
                </form>
                
            </div>
        </div>
    
  )
}

export default Register