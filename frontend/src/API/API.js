import toast from "react-hot-toast";

export const getConversationsAPI = async (source) => {
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


export const deleteConversation = async (conversationId) => {
    try {
        const res = await fetch('/api/conversations/delete',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({conversationId})
        })
        console.log('Чат успешно удален')
        return res.json();
    } catch (e) {
        toast.error(e.message);
    }
}

export const getSearchedUsers = async (username) => {
    try {
        const res = await fetch(`/api/users/search/${username}`)

        return res.json();
    } catch (e) {
        toast.error(e.message);
    }
}


export const getConversationParticipantsAPI = async (conversationId) => {
    try {
        const res = await fetch(`/api/conversations/participants/${conversationId}`);
        const data = await res.json();
        if(data.error) {
            throw new Error(data.error);
        }
        return data;
    } catch (e) {
        toast.error(e.message);
    }
}


export const deleteUserFromConversationAPI = async (userId, conversationId) => {
    try {
        const res = await fetch(`/api/conversations/remove/${userId}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({conversationId})
        })
        return res.json();
    } catch (e) {
        console.log(e.message);
        return null;
    }
}


export const getUser = async (userId) => {
    try {
        const res = await fetch(`/api/users/${userId}`)
        return res.json();

    } catch (e) {
        console.log(e.message);
        return null;
    }
}

export const getUsersAPI = async () => {
    try {
        const res = await fetch(`/api/users`)
        return res.json();

    } catch (e) {
        console.log(e.message);
        return null;
    }
}
