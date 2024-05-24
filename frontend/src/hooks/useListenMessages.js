import {useCallback, useEffect} from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../store/useConversation";


const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    const addMessage = useCallback((newMessage) => {
        setMessages([...messages, newMessage]);
    },[messages]);



    useEffect(() => {
        socket?.on("newMessage", addMessage);

        return () => socket?.off("newMessage");
    }, [socket, addMessage]);
};
export default useListenMessages;