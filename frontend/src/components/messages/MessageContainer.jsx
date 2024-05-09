import React, {useEffect, useState} from 'react';
import Messages from "./Messages.jsx";
import MessageInput from "./MessageInput.jsx";
import { BiSolidMessage } from "react-icons/bi";
import useConversation from "../../store/useConversation.js";
import UserProfileModal from "../Modals/UserProfileModal.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
import AddUserModal from "../Modals/AddUserModal.jsx";
import UserList from "../Chat/UserList.jsx";
import useGetConversationUsers from "../../hooks/useGetConversationUsers.js";


const MessageContainer = () => {
    const {selectedConversation, setSelectedConversation} = useConversation();
    useGetConversationUsers();

    useEffect(() => {
        return () => setSelectedConversation(null)
    }, [setSelectedConversation]);

    return (
        <div className={'md:min-w-[550px] sm:min-w-[350px] flex flex-col'}>
            {selectedConversation
                ?
                <div className={'flex flex-col h-full'}>
                    <div className={'bg-slate-500 px-4 py-2 mb-2 flex justify-between items-center'}>
                        <div>
                            <span className={'label-text'}>To: </span>
                            <span className={'label-text font-bold'}>{selectedConversation.conversationName}</span>
                        </div>
                        { selectedConversation.type !== 'CHAT' &&
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