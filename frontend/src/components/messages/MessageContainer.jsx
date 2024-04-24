import React, {useEffect} from 'react';
import Messages from "./Messages.jsx";
import MessageInput from "./MessageInput.jsx";
import { BiSolidMessage } from "react-icons/bi";
import useConversation from "../../store/useConversation.js";
const MessageContainer = () => {
    const {selectedConversation, setSelectedConversation} = useConversation();

    useEffect(() => {
        return () => setSelectedConversation(null)
    }, [setSelectedConversation]);

    return (
        <div className={'md:min-w-[750px] flex flex-col'}>
            {selectedConversation
                ?
                <div className={'flex flex-col h-full'}>
                    <div className={'bg-slate-500 px-4 py-2 mb-2'}>
                        <span className={'label-text'}>To: </span>
                        <span className={'label-text font-bold'}>{selectedConversation.fullName}</span>
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