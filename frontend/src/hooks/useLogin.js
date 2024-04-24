import {useState} from "react";
import {useAuthContext} from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const login = async (username, password) => {

        const success = handleInputErrors(username, password);
        if(!success) return;

        setLoading(true)
        try {
            const res = await fetch(('/api/auth/login'), {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({username, password})
            })
            const data = await res.json();
            if(data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem('chat-user', JSON.stringify(data));
            setAuthUser(data);

        } catch (e) {
            toast.error(e.message);
        } finally {
            setLoading(false)
        }
    }

    return {loading, login};
}

export default useLogin;


function handleInputErrors(username, password) {
    if(!username || !password) {
        toast.error(`Заполните все поля`)
        return false;
    }

    return true;
}