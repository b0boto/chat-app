import React from 'react';
import toast from "react-hot-toast";
import useCreateConversation from "../../hooks/useCreateConversation.js";
import {useAuthContext} from "../../context/AuthContext.jsx";
import useConversation from "../../store/useConversation.js";

const User = ({user}) => {
   const {createConversation} = useCreateConversation();
   const {authUser} = useAuthContext();
   const {selectedConversation, setSelectedConversation} = useConversation();
    const handleSubmit = async (e, user) => {
        e.preventDefault();
        const result = await createConversation('', 'CHAT', user._id);
        console.log(result)
        if(result) {
            toast.success(`Пользователь ${user.username} добавлен`)

        }
    }


    return (
        <div className={'flex flex-col'}>
            <div className={'flex justify-between items-center p-1 gap-2'}>
                <img className={'w-12 h-12'} src={user.profilePicture} alt="avatar"/>
                <span>{user.username}</span>
                <button className={'btn'} onClick={(e) => handleSubmit(e, user)}>+</button>
            </div>
            <div className={'divider m-0 p-0 h-0'}></div>

        </div>

    );
};

export default User;