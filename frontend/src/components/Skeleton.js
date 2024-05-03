import React from 'react'

function Skeleton() {
  return Array(12).fill(0).map((item)=>{
               return <div className="flex h-[200px] w-[100%]   rounded-xl relative animate-pulse-fast">
            <div className='absolute h-[70%] w-full bg-slate-300 rounded-xl'></div>
            <div className='absolute rounded-xl h-[25%] w-full bg-slate-300 bottom-0'></div>
        </div>
            })
        }
        
    
  


export default Skeleton