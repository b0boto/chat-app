import React from 'react';
import toast from "react-hot-toast";
import useConversation from "../../store/useConversation.js";
import {deleteUserFromConversationAPI} from "../../API/API.js";
import {useAuthContext} from "../../context/AuthContext.jsx";
import useGetConversationUsers from "../../hooks/useGetConversationUsers.js";

const UserProfileModal = ({children, isAdmin, visible, setVisible, userId}) => {
    const {selectedConversation, setSelectedConversation} = useConversation();
    const {getParticipants} = useGetConversationUsers();



    const handleSubmit = async () => {
        setVisible(false)
        await deleteUserFromConversationAPI(userId, selectedConversation)
        let groupId = selectedConversation;
        setSelectedConversation(null);
        setSelectedConversation(groupId);
        toast.success('Вы успешно удалили пользователя!')
        await getParticipants(selectedConversation._id);
    }
    const {users} = useConversation();

    const {authUser} = useAuthContext();

    const selectedUser = users.get(userId);

    return (
        <div className={`modal ${visible ? 'opacity-100 pointer-events-auto' : ''} `}>
            <div className={'modal-box'}>
                <div className={'flex justify-center items-center flex-col gap-2'}>
                    <img src={selectedUser?.profilePicture} alt="f"/>
                    <h1 className={'text-3xl'}>{selectedUser?.username}</h1>
                </div>

                <div className={'flex items-center justify-center mt-4 gap-4'}>
                    {isAdmin || selectedUser?._id === authUser._id ? (
                        <button
                            className={'btn btn-outline btn-error text-white cursor-pointer'}
                            onClick={handleSubmit}
                        >
                            {authUser._id === selectedUser?._id ? 'Выйти' : 'Удалить'}
                        </button>) : ''}

                    <button className={'btn text-white cursor-pointer'} onClick={() => setVisible(false)}>Закрыть</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfileModal;