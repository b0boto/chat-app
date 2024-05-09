import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
    addUserToConversation,
    createConversation,
    deleteConversation, getConversationParticipants,
    getConversations, removeUserFromConversation,
} from "../controllers/conversationController.js";

const router = express.Router();

router.post('/create', protectRoute, createConversation);
router.post('/add/:id', protectRoute, addUserToConversation);
router.post('/delete', protectRoute, deleteConversation);
router.post('/remove/:id', protectRoute, removeUserFromConversation);
router.get('/', protectRoute, getConversations);
router.get('/participants/:id', protectRoute, getConversationParticipants);



export default router;