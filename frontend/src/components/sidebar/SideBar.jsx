import React from 'react';
import SearchInput from "./SearchInput.jsx";
import Conversations from "./Conversations.jsx";
import LogoutButton from "./LogoutButton.jsx";
import SideBarFooter from "./SideBarFooter.jsx";
import CreateGroupModal from "./CreateGroupModal.jsx";

const SideBar = () => {
    return (
        <div className={'border-r border-slate-500 p-4 flex flex-col'}>
            <SearchInput/>
            <div className="divider px-3"></div>
            <Conversations/>
            <CreateGroupModal/>
            <SideBarFooter/>
        </div>
    );
};

export default SideBar;