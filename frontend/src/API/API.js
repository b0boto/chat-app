import toast from "react-hot-toast";

export const getConversationsAPI = async (source) => {
    console.log('getConversationsAPI источник', source)

    try {
        const res = await fetch('/api/conversations');
        const data = await res.json();

        if(data.error) {
            throw new Error(data.error);
        }

        return data;
    } catch (e) {
        toast.error(e.message);
    }
}
