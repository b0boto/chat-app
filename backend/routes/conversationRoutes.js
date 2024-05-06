import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
    addUserToConversation,
    createConversation,
    deleteConversation,
    getConversations, removeUserFromConversation,
} from "../controllers/conversationController.js";

const router = express.Router();

router.post('/create', protectRoute, createConversation);
router.post('/add/:id', protectRoute, addUserToConversation);
router.post('/delete', protectRoute, deleteConversation);
router.post('/remove/:id', protectRoute, removeUserFromConversation);
router.get('/', protectRoute, getConversations);


export default router;