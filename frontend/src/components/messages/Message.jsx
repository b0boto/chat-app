import React from 'react';
import {useAuthContext} from "../../context/AuthContext.jsx";
import useConversation from "../../store/useConversation.js";

const Message = ({message}) => {
    const {authUser} = useAuthContext();
    const {users} = useConversation();
    const isMyMessage = message.senderId === authUser._id;
    const chatClassName = isMyMessage ? 'chat-end' : 'chat-start';
    const bubbleBgColor = isMyMessage ? 'bg-blue-500' : 'bg-gray-700';

    const date = new Date(message.createdAt)

    const dateString = `${date.getFullYear(message.createdAt)}.${date.getMonth(message.createdAt) + 1}.${date.getDate(message.createdAt)} - 
    ${date.getHours()}:${date.getMinutes()}`;

    return (
        <div className={`chat ${chatClassName}`}>
            <div className={'chat-image avatar'}>
                <div className={'w-10 rounded-full'}>
                    <img src={users.get(message.senderId)?.profilePicture} alt="d"/>
                </div>
            </div>
            <div className={`chat-bubble max-w-96 ${bubbleBgColor}`}>{message.message}</div>
            <div className="chat-footer opacity-35 flex gap-1 items-center">{dateString}</div>
        </div>
    );
};

export default Message;