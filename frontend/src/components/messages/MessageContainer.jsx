import React, {useEffect, useState} from 'react';
import Messages from "./Messages.jsx";
import MessageInput from "./MessageInput.jsx";
import { BiSolidMessage } from "react-icons/bi";
import useConversation from "../../store/useConversation.js";
import {useAuthContext} from "../../context/AuthContext.jsx";
import UserList from "../Chat/UserList.jsx";
import useGetConversationUsers from "../../hooks/useGetConversationUsers.js";
import {getUser} from "../../API/API.js";
import io from 'socket.io-client';
import {useSocketContext} from "../../context/SocketContext.jsx";

const MessageContainer = () => {
    const {selectedConversation, setSelectedConversation} = useConversation();
    useGetConversationUsers();
    const {authUser} = useAuthContext();
    const [chat, setChat] = useState({});
    const [isChat, setIsChat] = useState(false);



    const getUserChat = async () => {
        const userId = selectedConversation.participants.filter((id) => id !== authUser._id);
        setChat(await getUser(userId));
    }

    useEffect(() => {
        if(selectedConversation?.type === 'CHAT') {
            getUserChat();
            setIsChat(true);
        }
        else {
            setChat({});
            setIsChat(false);
        }
    }, [selectedConversation]);



    useEffect(() => {
        return () => setSelectedConversation(null)
    }, [setSelectedConversation]);


    return (
        <div className={'md:min-w-[550px] sm:min-w-[350px] flex flex-col'}>
            {selectedConversation
                ?
                <div className={'flex flex-col h-full'}>
                    <div className={'bg-slate-500 px-4 py-2 mb-2 flex justify-between items-center'}>
                        <div className={'flex items-center gap-2'}>
                            <img className={'rounded-full w-14'} src={isChat ? chat.profilePicture : selectedConversation.img} alt=""/>
                            <div>
                                <span className={'label-text'}>To: </span>
                                <span
                                    className={'label-text font-bold'}>{isChat ? chat.username : selectedConversation.conversationName}</span>
                            </div>

                        </div>
                        {selectedConversation.type !== 'CHAT' &&
                            (
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn m-1">Участники</div>
                                    <UserList/>
                                </div>
                            )
                        }
                    </div>

                    <Messages/>
                    <MessageInput/>
                </div>
                :
                <div className={'flex h-full text-2xl flex-col justify-center items-center'}>
                    <span>Выберите чат :)</span>
                    <BiSolidMessage />
                </div>
            }
        </div>
    );
};

export default MessageContainer;