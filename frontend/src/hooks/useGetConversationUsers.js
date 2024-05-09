import useConversation from "../store/useConversation.js";
import {useEffect} from "react";
import {getConversationParticipantsAPI, getConversationsAPI} from "../API/API.js";

const useGetConversationUsers = () => {

    const {participants, setParticipants, selectedConversation, users} = useConversation();

    const getParticipants = async (selectedConversationId) => {
        const data = await getConversationParticipantsAPI(selectedConversationId);
        const newMap = new Map(users);
        const newMap2 = new Map();

        for(let id of data) {
            newMap2.set(id, newMap.get(id));
        }
        setParticipants(Array.from(newMap2).map(([key, value]) => ({key, value})) || []);
    }

    useEffect(() => {
        if(selectedConversation)
            getParticipants(selectedConversation._id);
    }, [users, selectedConversation]);


    return {getParticipants};
}



export default useGetConversationUsers;