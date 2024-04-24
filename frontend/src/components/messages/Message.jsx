import React from 'react';
import {useAuthContext} from "../../context/AuthContext.jsx";
import useConversation from "../../store/useConversation.js";

const Message = ({message}) => {
    const {authUser} = useAuthContext();
    const {selectedConversation} = useConversation();
    const fromMe = message.senderId === authUser._id;
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const profilePic = fromMe ? authUser.profilePicture : selectedConversation?.profilePicture;
    const bubbleBgColor = fromMe ? 'bg-blue-500' : 'bg-gray-700';

    const date = new Date()

    const dateString = `${date.getFullYear(message.createdAt)}.${date.getMonth(message.createdAt) + 1}.${date.getDate(message.createdAt)} - 
    ${date.getHours()}:${date.getMinutes()}`;


    return (
        <div className={`chat ${chatClassName}`}>
            <div className={'chat-image avatar'}>
                <div className={'w-10 rounded-full'}>
                    <img alt="Tailwind CSS chat bubble component"
                         src={profilePic}/>
                </div>
            </div>
            <div className={`chat-bubble max-w-96 ${bubbleBgColor}`}>{message.message}</div>
            <div className="chat-footer opacity-35 flex gap-1 items-center">{dateString}</div>
        </div>
    );
};

export default Message;