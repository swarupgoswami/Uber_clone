//// filepath: /c:/Users/goswa/OneDrive/Desktop/Uber_clone/frontend/src/context/socketContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const Socket = io(`${import.meta.env.VITE_BASE_URL}`);

export const SocketContext = createContext();


const SocketProvider = ({ children }) => {
  // Connect to your backend socket server.
  //   const [socket, setSocket] = useState(null);

  useEffect(() => {
    Socket.on("connect", () => {
      console.log("Socket connected:", Socket.id);
    });

    // Cleanup on unmount
    Socket.on("disconnect", () => {
      console.log("disconnected from server");
    });

    
  }, []);



  return (
    <SocketContext.Provider value={{Socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
