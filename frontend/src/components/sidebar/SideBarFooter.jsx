import React from 'react';
import LogoutButton from "./LogoutButton.jsx";
import AddGroupButton from "./AddGroupButton.jsx";
const SideBarFooter = () => {
    return (
        <div className={'flex justify-between mt-auto items-center'}>
            <LogoutButton/>
            <AddGroupButton/>
        </div>
    );
};

export default SideBarFooter;