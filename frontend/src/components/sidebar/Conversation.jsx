import React from 'react';
import useConversation from "../../store/useConversation.js";
import {useSocketContext} from "../../context/SocketContext.jsx";

const Conversation = ({conversation}) => {
    const {selectedConversation, setSelectedConversation} = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);


    return (
        <div>
            <div className={`flex gap-2 items-center hover:bg-gray-700 rounded p-2 py-1 cursor-pointer
                 ${isSelected ? 'bg-gray-600' : ''}`}
                 onClick={() => setSelectedConversation(conversation)}
            >
                <div className={`avatar ${isOnline ? 'online' : 'offline'}`}>
                    <div className="w-14 rounded-full">
                        <img src={conversation.profilePicture}/>
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    <div>
                        <p>{conversation.fullName}</p>
                    </div>
                </div>
            </div>
            <div className="divider my-0 py-0 h-1"/>
        </div>

    );
};

export default Conversation;