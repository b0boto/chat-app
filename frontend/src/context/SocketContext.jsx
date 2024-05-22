import {createContext, useContext, useEffect, useState} from "react";
import {useAuthContext} from "./AuthContext.jsx";
import {io} from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();


    // http://localhost:5000
    useEffect(() => {
        if(authUser) {
            console.log('socket connected')
            const socket = io('https://chat-app-4g6v.onrender.com', {
                query: {
                    userId: authUser._id
                }
            });

            setSocket(socket);
            socket.on('getOnlineUsers', (users) => {
                setOnlineUsers(users);

            })

            return () => socket.close();
        } else {
            if(socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}