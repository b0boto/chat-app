import React, {useEffect, useRef} from 'react';
import Message from "./Message.jsx";
import useGetMessages from "../../hooks/useGetMessages.js";
import useListenMessages from "../../hooks/useListenMessages.js";
import useGetUsers from "../../hooks/useGetUsers.js";

const Messages = () => {
    const {messages, loading} = useGetMessages();
    useGetUsers();
    const lastMessageRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            const block = lastMessageRef.current;
            if(block)
                block.parentElement.scrollTop = block.offsetTop;
        }, 100)
    }, [messages]);

    return (
        <div className={`px-4 flex-1 overflow-auto mb-4 py-4 ${messages.length === 0 ? 'flex justify-center items-center' : ''}`}>
            {!loading && messages.length > 0 && messages.map((message) => (
                <div key={message._id} ref={lastMessageRef}>
                    <Message message={message}/>
                </div>
            ))}

            {!loading && messages.length === 0 && (
                <p className={'text-center'}>Отправьте сообщение чтобы начать диалог...</p>
            )}
        </div>
    );
};

export default Messages;