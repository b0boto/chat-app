import {getConversationsAPI} from "../API/API.js";
import {useCallback, useEffect, useState} from "react";
import useConversation from "../store/useConversation.js";
import useGetConversationUsers from "./useGetConversationUsers.js";

let key = 1;
const useConversationKeeper = () => {
    const {setConversations, conversations, selectedConversation, setSelectedConversation} = useConversation();
    const [loading, setLoading] = useState(false);
    const {getParticipants} = useGetConversationUsers();

    const changeLoading = useCallback(() => {
        if(!loading) setLoading(true);
    },[loading]);

    const getConversations = async () => {
        const data = await getConversationsAPI('useConversationKeeper');
        setConversations(data || []);
        let bool = false;
        conversations.forEach((conversation) => {
            if(conversation._id === selectedConversation._id) {
                bool = true;
            }
        })
        if(!bool) setSelectedConversation(null);

        setLoading(false)
    }

    useEffect(() => {
        const a = setInterval(changeLoading, 5000)
        return () => clearInterval(a);
    }, []);

    useEffect(() => {
        getConversations();
        if(selectedConversation)
            getParticipants(selectedConversation._id);
    }, [loading]);
}

export default useConversationKeeper;