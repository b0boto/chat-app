import React, {useState} from 'react';
import { BsFillSendFill } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage.js";
import {useAuthContext} from "../../context/AuthContext.jsx";
import useConversation from "../../store/useConversation.js";
const MessageInput = () => {

    const [message, setMessage] = useState('');
    const {loading, sendMessage} = useSendMessage();
    const {selectedConversation} = useConversation();
    const {authUser} = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!message) return;
        await sendMessage(message);
        setMessage('');
    }

    return (
        <form className={'px-4 my-3'} onSubmit={handleSubmit}>
            <div className={'w-full relative'}>
                {
                    authUser._id === selectedConversation.adminUser ? (
                        <div>
                            <input
                                type="text"
                                className={'border text-sm rounded-lg block w-full p-2.5 bg-gray-700'}
                                placeholder={'Отправить сообщение'}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button type={'submit'} className={'absolute inset-y-0 end-0 flex items-center pe-3'}>
                                {loading ? <span className={'loading-spinner loading'}></span> :
                                    <BsFillSendFill className={'w-6 h-6'}/>}

                            </button>
                        </div>
                    ) :
                        <div className={'text-center'}>Доступен только просмотр сообщений</div>
                }

            </div>
        </form>
    );
};

export default MessageInput;