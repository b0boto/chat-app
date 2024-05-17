import {useState} from "react";
import useConversation from "../store/useConversation.js";
import toast from "react-hot-toast";
import useGetConversations from "./useGetConversations.js";

const useCreateConversation = () => {
    const [loading, setLoading] = useState(false);

    const createConversation = async (conversationName, type, receiverId = null) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/conversations/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({conversationName: conversationName, type: type, receiverId: receiverId})
            })

            const data = await res.json();

            if(data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (e) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, createConversation};
}

export default useCreateConversation;