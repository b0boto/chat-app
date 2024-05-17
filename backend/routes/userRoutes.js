import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {getOneUser, getUsersForSideBar, searchUsers} from "../controllers/userController.js";

const router = express.Router();


router.get('/', protectRoute, getUsersForSideBar);
router.get('/search/:username', protectRoute, searchUsers);
router.get('/:id', protectRoute, getOneUser);


export default router;