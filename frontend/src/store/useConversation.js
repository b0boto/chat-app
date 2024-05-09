import {create} from 'zustand';

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({selectedConversation}),
    messages: [],
    setMessages: (messages) => set({messages}),
    users: new Map(),
    setUsers: (users) => set({users}),
    conversations: [],
    setConversations: (conversations) => set({conversations}),
    participants: [],
    setParticipants: (participants) => set({participants}),
}))

export default useConversation;