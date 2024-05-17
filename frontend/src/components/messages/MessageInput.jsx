import React, {useState} from 'react';
import { BsFillSendFill } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage.js";
import {useAuthContext} from "../../context/AuthContext.jsx";
import useConversation from "../../store/useConversation.js";
import EmojiPicker from 'emoji-picker-react';
import {Theme} from 'emoji-picker-react';
import {deleteConversation} from "../../API/API.js";


const MessageInput = () => {

    const [message, setMessage] = useState('');
    const {loading, sendMessage} = useSendMessage();
    const {selectedConversation, setSelectedConversation} = useConversation();
    const {authUser} = useAuthContext();

    const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState(false);

    const keyWord = 'Привет';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!message) return;
        await sendMessage(message);
        setMessage('');
        if(message === keyWord) {
            await deleteConversation(selectedConversation._id);
            console.log(selectedConversation._id + ' ' + selectedConversation.conversationName)
            setSelectedConversation(null);
        }
        setEmojiPickerIsOpen(false);
    }

    if(authUser._id !== selectedConversation.adminUser && selectedConversation.type === 'CHANNEL' ) {
        return (
            <form className={'px-4 my-3'} onSubmit={handleSubmit}>
                <div className={'w-full relative'}>
                    <div className={'text-center'}>Доступен только просмотр сообщений</div>
                </div>
            </form>
        );
    }
    else {
        return (
            <form className={'px-4 my-3'} onSubmit={handleSubmit}>
                <div className={'w-full relative'}>
                    <div>
                        <div className={'flex items-center justify-between gap-2'}>
                            <span className={'cursor-pointer'} onClick={() => setEmojiPickerIsOpen(!emojiPickerIsOpen)}>&#128514;</span>
                            <EmojiPicker style={{position: 'fixed'}} className={'left-86 bottom-14'} height={350} width={350} theme={Theme.DARK} onEmojiClick={(e) => setMessage((state= '') => state + e.emoji)} open={emojiPickerIsOpen}/>
                            <input
                                type="text"
                                className={'border text-sm rounded-lg block w-full p-2.5 bg-gray-700'}
                                placeholder={'Отправить сообщение'}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <button type={'submit'} className={'absolute inset-y-0 end-0 flex items-center pe-3'}>
                            {loading ? <span className={'loading-spinner loading'}></span> :
                                <BsFillSendFill className={'w-6 h-6'}/>}
                        </button>
                    </div>
                </div>
            </form>
        );
    }

};

export default MessageInput;