import React from 'react';
import useGetConversations from "../../hooks/useGetConversations.js";
import Conversation from "./Conversation.jsx";
import useConversationKeeper from "../../hooks/useConversationKeeper.js";

const Conversations = () => {
    const {loading, conversations} = useGetConversations();

    return (
        <div className={'py-2 flex flex-col overflow-auto'}>
            {conversations.map(conversation => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                />
            ))}

            {loading ? <span className={'loading-spinner loading w-full h-full'}></span> : null}
        </div>
    );
};

export default Conversations;