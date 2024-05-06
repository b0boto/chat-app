import {useEffect, useState} from "react";
import {getConversationsAPI} from "../API/API.js";
import useConversation from "../store/useConversation.js";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const {conversations, setConversations} = useConversation();

    const getConversations = async () => {
        setLoading(true);
        const data = await getConversationsAPI('useGetConversations');
        setConversations(data || []);
        console.log('gsdfg getConversations()')
        setLoading(false);
    }

    useEffect(() => {
        getConversations();
    }, []);

    return {loading, conversations, setConversations}
}

export default  useGetConversations;