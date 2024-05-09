import React, {useEffect, useState} from 'react';
import useConversation from "../../store/useConversation.js";
import AddUserModal from "../Modals/AddUserModal.jsx";
import UserProfileModal from "../Modals/UserProfileModal.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {getConversationParticipantsAPI} from "../../API/API.js";
import useGetConversationUsers from "../../hooks/useGetConversationUsers.js";

const UserList = () => {

    const [addUserModal, setAddUserModal] = useState(false);
    const {selectedConversation, participants} = useConversation();
    const [selectedUser, setSelectedUser] = useState('');
    const [modal, setModal] = useState(false);
    const {authUser} = useAuthContext();



    return (
        <div>
            <ul tabIndex={0}
                className="dropdown-content text-center z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                {participants?.map((user) => (

                    <li
                        className={'p-2 hover:bg-accent-content/50 cursor-pointer'}
                        key={user?.value?._id}
                        onClick={() => {
                            setSelectedUser(user?.value?._id)
                            setModal(true);
                        }}
                    >
                        {user?.value?.fullName}
                        {user?.value?._id === selectedConversation.adminUser ? '*' : ''}
                    </li>
                ))
                }
                <button className={'hover:bg-green-800 cursor-pointer'} onClick={() => setAddUserModal(true)}>+</button>
            </ul>
            <AddUserModal visible={addUserModal} setVisible={setAddUserModal}/>
            <UserProfileModal isAdmin={authUser._id === selectedConversation?.adminUser} visible={modal}
                              setVisible={setModal} userId={selectedUser}/>
        </div>

    );
};

export default UserList;