import React, {useState} from 'react';
import toast from "react-hot-toast";
import useAddUserConversation from "../../hooks/useAddUserConversation.js";
import useConversation from "../../store/useConversation.js";
import {getConversationParticipantsAPI, getUsersAPI} from "../../API/API.js";
import useGetConversationUsers from "../../hooks/useGetConversationUsers.js";

const AddUserModal = ({children, visible, setVisible}) => {
    const {addUserToConversation} = useAddUserConversation();
    const {selectedConversation, setSelectedConversation, users, setUsers} = useConversation();
    const [userName, setUserName] = useState('');
    const {getParticipants} = useGetConversationUsers();


    const handleSubmit = async () => {
        setVisible(false)
        const usersAPI = await getUsersAPI()
        let userId = '';
        if(usersAPI) {
            usersAPI.forEach((user) => {
                if(user.username === userName)
                   userId = user._id;
            })
        }
        if(userId !== '') {
           const data = await addUserToConversation(userId, selectedConversation._id);
           const newMap = new Map(users);
           newMap.set(data._id, data);
           setUsers(newMap)
        }
        else
            toast.error('Такого пользователя не существует или вы пытаетесь добавить себя');

        await getParticipants(selectedConversation._id);
    }

    return (
        <div className={`modal ${visible ? 'opacity-100 pointer-events-auto' : ''} `}>
            <div className={'modal-box'}>
                <div className={'flex flex-col w-full gap-10 items-center mb-10'}>
                    <h1 className={'text-center text-2xl'}>Введите имя пользователя которого хотите добавить</h1>
                    <input className={'focus:outline-none input input-bordered input-accent w-full max-w-xs'} type="text" placeholder={'Имя пользователя'} value={userName}
                           onChange={(e) => setUserName(e.target.value)}/>
                </div>

                <div className={'flex items-center justify-center mt-4 gap-4'}>
                    <button className={'btn btn-outline text-white cursor-pointer'} onClick={handleSubmit}>Добавить
                    </button>
                    <button className={'btn text-white cursor-pointer'} onClick={() => setVisible(false)}>Отменить</button>
                </div>
            </div>
        </div>
    );
};

export default AddUserModal;