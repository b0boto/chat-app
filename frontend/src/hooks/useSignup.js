import React, {useState} from 'react';
import toast from "react-hot-toast";
import {useAuthContext} from "../context/AuthContext.jsx";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {authUser, setAuthUser} = useAuthContext()

    const signup = async ({fullName, username, password, confirmPassword, gender}) => {
        const success = handleInputErrors({fullName, username, password, confirmPassword, gender})

        if(!success) return;

        setLoading(true);
        try {
            const res = await fetch(('/api/auth/signup'), {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({fullName, username, password, confirmPassword, gender})
            })
            const data = await res.json();
            if(data.error) {
                throw new Error(data.error)
            }
            localStorage.setItem('Chat-user', JSON.stringify(data));
            setAuthUser(data);
        } catch (e) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    }
    return {loading, signup};
};

export default useSignup;

function handleInputErrors({fullName, username, password, confirmPassword, gender}) {
    if(!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error(`Заполните все поля`)
        return false;
    }

    if(password !== confirmPassword) {
        toast.error(`Пароли не совпадают`)
        return false;
    }

    if(password.length < 6) {
        toast.error(`Пароль должен состоять не менее чем из 6 символов`)
        return false;
    }

    return true;
}