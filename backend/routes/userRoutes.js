import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {getOneUser, getUsersForSideBar} from "../controllers/userController.js";

const router = express.Router();


router.get('/', protectRoute, getUsersForSideBar);
router.get('/:id', protectRoute, getOneUser);


export default router;