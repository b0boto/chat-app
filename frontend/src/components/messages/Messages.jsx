import React, {useEffect, useRef} from 'react';
import Message from "./Message.jsx";
import useGetMessages from "../../hooks/useGetMessages.js";
import useListenMessages from "../../hooks/useListenMessages.js";

const Messages = () => {
    const {messages, loading} = useGetMessages();
    useListenMessages();
    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({behavior: 'smooth'})
        }, 100)
    }, [messages]);

    return (
        <div className={`px-4 flex-1 overflow-auto ${messages.length === 0 ? 'flex justify-center items-center' : ''}`}>
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