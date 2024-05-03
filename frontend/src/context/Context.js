import React, { useEffect, useState } from 'react'

export const contextProvider= React.createContext();
function Context({children}) {
    const [filesToShow,setFilesToShow] = useState([]);
    const [tempFilesToShow,setTempFilesToShow] = useState([]);
    const [searchValue,setSearchvalue] = useState("");
    const [tempSearchedFiles,setTempSearchedFiles] = useState([]);
    const [tags,setTags] = useState([]);
    const [uploadedData,setUploadedData]= useState([]);
    const [updater,setUpdater] = useState(false);
    useEffect(()=>{
        console.log(tempSearchedFiles);
    },[tempSearchedFiles])
  return (
    <contextProvider.Provider value={{filesToShow,setFilesToShow,tempFilesToShow,setTempFilesToShow,searchValue,setSearchvalue,tempSearchedFiles,setTempSearchedFiles,tags,setTags,uploadedData,setUploadedData,updater,setUpdater}}>
        {children}
    </contextProvider.Provider>
  )
}

export default Context