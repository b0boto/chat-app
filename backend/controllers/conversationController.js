import Conversation from "../models/conversationModel.js";

export const createConversation = async (req, res) => {
    try {
        const createrId = req.user._id;
        const { conversationName: conversationName, type: conversationType } = req.body;
        console.log(conversationType)

        let conversation;
        if(conversationName !== '') {
            conversation = await Conversation.create({
                participants: [createrId],
                adminUser: [createrId],
                conversationName: conversationName,
                type: conversationType,
                img: `https://avatar.iran.liara.run/username?username=${conversationName}+`
            })
        } else {
            conversation = await Conversation.create({
                participants: [createrId],
                type: conversationType,
            })
        }

        await conversation.save();
        res.status(201).json(conversation)
    } catch (e) {
        res.status(500).json({error: 'error in createConversation'})
        console.log('Ошибка в conversationController ', e);
    }
}

export const addUserToConversation = async (req, res) => {
    try {
        const {id: userToAdd} = req.params;
        const {conversationId} = req.body;

        const conversation = await Conversation.findById(conversationId);

        conversation.participants.push(userToAdd);
        await conversation.save();
        res.status(200).json(conversation);

    } catch (error) {
        console.log('error in addUserToConversation ', e)
        res.status(500).json({error: 'Internal server error'})
    }
}


export const removeUserFromConversation = async (req, res) => {
    try {
        const {id: userToRemove} = req.params;
        const {conversationId} = req.body;

        const conversation = await Conversation.findById(conversationId);
        const participants = conversation.participants;
        const newMass = participants.filter((p) => p.toString() !== userToRemove)

        conversation.participants = newMass;
        await conversation.save();
        res.status(200).json(conversation);

    } catch (error) {
        console.log('error in addUserToConversation ', e)
        res.status(500).json({error: 'Internal server error'})
    }
}

export const getConversations = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const conversations = await Conversation.find({participants: loggedInUserId});

        res.status(200).json(conversations);
    } catch (error) {
        console.log('error in getConversations')
        res.status(500).json({error: 'Internal server error'})
    }
}





export const deleteConversation = async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({error: 'error in deleteConverstaion'})
        console.log('Ошибка в conversationController');
    }
}