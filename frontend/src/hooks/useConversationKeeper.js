import toast from "react-hot-toast";
import {getConversationsAPI} from "../API/API.js";
import useGetConversations from "./useGetConversations.js";
import {useCallback, useEffect, useState} from "react";
import useConversation from "../store/useConversation.js";

let key = 1;
const useConversationKeeper = () => {
    const {setConversations} = useConversation();
    const [loading, setLoading] = useState(false);

    const changeLoading = useCallback(() => {
        if(!loading) setLoading(true);
    },[loading]);

    const getConversations = async () => {
        const data = await getConversationsAPI('useConversationKeeper');
        setConversations(data || []);
        setLoading(false)
    }

    useEffect(() => {
        const a = setInterval(changeLoading, 1000)
        return () => clearInterval(a);
    }, []);

    useEffect(() => {
        getConversations();
    }, [loading]);
}

export default useConversationKeeper;