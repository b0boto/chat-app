import toast from "react-hot-toast";

const useAddUserConversation = () => {

    const addUserToConversation = async (userId, conversationId) => {
        try {
            const res = await fetch(`/api/conversations/add/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({conversationId: conversationId})
            })
            const data = await res.json();

            if(data.error) {
                throw new Error(data.error);
            }
            toast.success('Вы успешно добавили пользователя!')
            return data;

        } catch (e) {
            toast.error(e.message);
        }
    }
    return {addUserToConversation};
}

export default useAddUserConversation;