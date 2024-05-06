import React, {useEffect, useState} from 'react';
import Messages from "./Messages.jsx";
import MessageInput from "./MessageInput.jsx";
import { BiSolidMessage } from "react-icons/bi";
import useConversation from "../../store/useConversation.js";
import DeleteUserModal from "../Modals/deleteUserModal.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";

const MessageContainer = () => {
    const {selectedConversation, setSelectedConversation} = useConversation();
    const {users} = useConversation();
    const newMap = new Map(users);
    const emptyUsersId = selectedConversation?.participants.filter((id) => users.get(id)) // получаем ид пользователей которых нету в глобал стейте
    const newUsers = [];

    const {authUser} = useAuthContext();

    const [selectedUser, setSelectedUser] = useState('');
    const [modal, setModal] = useState(false);

    if(emptyUsersId) {
        for(let id of emptyUsersId) {
            newUsers.push(newMap.get(id));
        }
    }

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
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn m-1">Участники</div>
                            <ul tabIndex={0}
                                className="dropdown-content text-center z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                { newUsers.map((user) => (
                                    <li
                                        className={'p-2 hover:bg-accent-content/50 cursor-pointer'}
                                        key={user._id}
                                        onClick={() => {
                                            if(authUser._id === selectedConversation.adminUser) {
                                                setSelectedUser(user._id)
                                                setModal(true);
                                            }
                                        }
                                        }>

                                        {user.fullName}
                                        {user._id === selectedConversation.adminUser ? '*' : ''}
                                    </li>
                                ))
                                }
                                <button className={'hover:bg-green-800 cursor-pointer'}>+</button>
                            </ul>
                        </div>
                    </div>
                    <DeleteUserModal visible={modal} setVisible={setModal} userId={selectedUser}/>
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