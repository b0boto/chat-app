import React, {useEffect, useState} from 'react';
import useConversation from "../../store/useConversation.js";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {getUser} from "../../API/API.js";
import {useSocketContext} from "../../context/SocketContext.jsx";

const Conversation = ({conversation}) => {
    const {selectedConversation, setSelectedConversation} = useConversation();
    const isSelected = selectedConversation?._id === conversation._id;
    const {authUser} = useAuthContext();
    const [chat, setChat] = useState({});

    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(chat._id);

    const [rooms, setRooms] = useState([]);
    const {socket} = useSocketContext();


    useEffect(() => {
        socket.on('roomUpdated', (updatedRooms) => {
            setRooms(updatedRooms);
        });

        return () => {
            socket.off('roomUpdated');
        };
    }, [])

    const getUserChat = async () => {
        const userId = conversation.participants.filter((id) => id !== authUser._id);
        setChat(await getUser(userId));
    }

    const handleJoinRoom = (roomId) => {
        // Отправка события выбора комнаты на сервер
        socket.emit('joinRoom', roomId);
        console.log(rooms)
    };

    const handleLeaveRoom = (roomId) => {
        // Отправка события отключения от комнаты на сервер
        socket.emit('leaveRoom', roomId);
    };

    useEffect(() => {
        getUserChat();
    }, []);

    if(conversation.type === 'CHAT') {
        return (
            <div>
                <div className={`flex gap-2 items-center hover:bg-gray-700 rounded p-2 py-1 cursor-pointer
                 ${isSelected ? 'bg-gray-600' : ''}`}
                     onClick={() => {
                         if(selectedConversation)
                             handleLeaveRoom(selectedConversation._id)
                         setSelectedConversation(conversation);
                         handleJoinRoom(conversation._id)
                     }}
                >
                    <div className={`avatar ${isOnline ? 'online' : 'offline'}`}>
                        <div className="w-14 rounded-full">
                            <img src={chat.profilePicture}/>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1">
                        <div>
                            <p>
                                {
                                    chat.username
                                }
                            </p>
                            <p className={'whitespace-nowrap max-w-36 overflow-hidden'}></p>
                        </div>
                    </div>
                </div>
                <div className="divider my-0 py-0 h-1"/>
            </div>
        )
    }

    return (
        <div>
            <div className={`flex gap-2 items-center hover:bg-gray-700 rounded p-2 py-1 cursor-pointer
                 ${isSelected ? 'bg-gray-600' : ''}`}
                 onClick={() => {
                     if(selectedConversation)
                         handleLeaveRoom(selectedConversation._id)
                     setSelectedConversation(conversation);
                     handleJoinRoom(conversation._id);
                 }}
            >
                <div className={`avatar`}>
                    <div className="w-14 rounded-full">
                        <img src={conversation.img}/>
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    <div>
                        <p>
                            {
                                conversation.conversationName
                                    ? conversation.conversationName
                                    : 'Текст'
                            }
                        </p>
                        <p className={'whitespace-nowrap max-w-36 overflow-hidden'}>Тип: {conversation.type}</p>
                    </div>
                </div>
            </div>
            <div className="divider my-0 py-0 h-1"/>
        </div>

    );
};

export default Conversation;