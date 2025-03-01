import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'


export const CaptainDataContext = createContext();



const CaptainContext=({children})=>{
    const[captain,setCaptain]=useState(null);
    const[isLoading,setisLoading]=useState(false);
    const[error,seterror]=useState(null);

    const UpdateCaptain=(captaindata)=>{
        setCaptain(captaindata);
    };

    const value={
        captain,
        setCaptain,
        isLoading,
        setisLoading,
        error,
        seterror,
        UpdateCaptain
    };
  
    return (
        <CaptainDataContext.Provider value={value}>
           {children}
        </CaptainDataContext.Provider>
    )
}

export default CaptainContext
