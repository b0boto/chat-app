import Conversation from "../models/conversationModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";
import UserModel from "../models/userModel.js";

export const createConversation = async (req, res) => {
    try {
        const createrId = req.user._id;
        const { conversationName: conversationName, type: conversationType, receiverId: receiverId, keyword: keyword} = req.body;

        let conversation;
        if(conversationName !== '') {
            conversation = await Conversation.create({
                participants: [createrId],
                adminUser: [createrId],
                conversationName: conversationName,
                type: conversationType,
                img: `https://avatar.iran.liara.run/username?username=${conversationName}+`,
                keyword: keyword
            })
        } else {
            conversation = await Conversation.find({participants: {$all: [createrId, receiverId]}, type: 'CHAT'})
            if(conversation.length > 0)
                return res.status(500).json({error: 'Данный пользователь уже добавлен'})

            conversation = await Conversation.create({
                participants: [createrId, receiverId],
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

        if(conversation.participants.indexOf(userToAdd) !== -1)
            return res.status(301).json({error: 'Данный пользователь уже есть в группе'})
        else if(userToAdd)
            conversation.participants.push(userToAdd);

        const user = await User.findById(userToAdd)

        await conversation.save();
        res.status(200).json(user);
    } catch (error) {
        console.log('error in addUserToConversation ', error)
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
        console.log('error in addUserToConversation ', error)
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

export const getConversationParticipants = async (req, res) => {
    try {
        const {id: conversationId} = req.params;
        const conversation = await Conversation.findById(conversationId);

        const participants = conversation.participants;
        res.status(200).json(participants);
    } catch (error) {
        console.log('error in getConversationParticipants')
        res.status(500).json({error: 'Internal server error'})
    }
}



export const deleteConversation = async (req, res) => {
    try {
        const {conversationId} = req.body;
        const result = await Conversation.findOneAndDelete({_id: conversationId})

        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({error: 'error in deleteConverstaion'})
        console.log('Ошибка в deleteConverstaion ', e);
    }
}