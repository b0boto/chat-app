import React from 'react';
import LogoutButton from "./LogoutButton.jsx";
import AddGroupButton from "./AddGroupButton.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";
const SideBarFooter = () => {
    const {authUser} = useAuthContext();


    return (
        <div className={'flex justify-between mt-auto items-center'}>
            <LogoutButton/>
            <div className={'flex gap-2 items-center'}>
                <img className={'w-12 h-12'} src={authUser.profilePicture} alt=""/>
                {authUser.username}
            </div>
            <AddGroupButton/>
        </div>
    );
};

export default SideBarFooter;