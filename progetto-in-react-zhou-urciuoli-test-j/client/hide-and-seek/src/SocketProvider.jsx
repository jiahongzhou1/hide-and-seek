import { useState, createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";

const URL = "http://localhost:8080";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const connectSocket = () => {
    if (!socket) {
      const newSocket = io(URL);
      setSocket(newSocket);
      return newSocket;
    }
    socket.connect();
    return socket;
  };

  useEffect(() => {
    const socket = connectSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connectSocket}}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

//prof questo pezzo l'ho spudoratamente copiato... l'ho capito ? >> si! saprei ricrearlo ? >> no lol
