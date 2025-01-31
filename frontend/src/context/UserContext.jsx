import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const UserDataContext = createContext()

const UserContext = ({children}) => {

  const[user,setuser]=useState({
    fullname:{
      firstname:"",
      lastname:""
    },
    email:"",
    password:"",
  })



  return (
    <div>
        <UserDataContext.Provider value={{user,setuser}}>
            {children} 
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
