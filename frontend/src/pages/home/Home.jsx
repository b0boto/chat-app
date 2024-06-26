import React from 'react';
import SideBar from "../../components/sidebar/SideBar.jsx";
import MessageContainer from "../../components/messages/MessageContainer.jsx";
import useConversationKeeper from "../../hooks/useConversationKeeper.js";

const Home = () => {
    useConversationKeeper();
    return (
        <div className={'bg-slate-800 flex sm:h-[550px] md:h-[750px] rounded-lg overflow-hidden bg-clip-padding backdrop-blur border border-gray-700'}>
            <SideBar/>
            <MessageContainer/>
        </div>
    );
};

export default Home;