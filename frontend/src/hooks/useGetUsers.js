import toast from "react-hot-toast";
import {useEffect} from "react";
import useConversation from "../store/useConversation.js";

const getUser = async (userId) => {
    try {
        const res = await fetch(`/api/users/${userId}`)
        return res.json();

    } catch (e) {
        console.log(e.message);
        return null;
    }
}

const getUsers = async (state, array) => {
    for (const id of array) {
        const data = await getUser(id);
        if(data) state.set(id, data);
    }
}

const useGetUser = () => {
    const {users, setUsers, selectedConversation} = useConversation();

    const fetchUsers = async () => {
        const emptyUsersId = selectedConversation.participants.filter((id) => !users.get(id)) // получаем ид пользователей которых нету в глобал стейте
        const newMap = new Map(users); // копия всех пользователей в глобал стейте
        await getUsers(newMap, emptyUsersId); // получаем новых пользователей и заносим в newMap

        setUsers(newMap); // заносим в глобал стейт новых пользователей
    }

    useEffect(() => {
        fetchUsers();
    }, [selectedConversation]);
}

export default useGetUser;

