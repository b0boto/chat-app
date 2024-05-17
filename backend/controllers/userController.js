import User from "../models/userModel.js";


export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log('error in getUsersForSideBar')
        res.status(500).json({error: 'Internal server error'})
    }
}

export const getOneUser = async (req, res) => {
    try {
        const {id: userId} = req.params
        let user = await User.findById(userId).select('-password');

        res.status(200).json(user);
    } catch (e) {
        console.log('error in getUser')
        res.status(500).json({error: 'Internal server error'})
    }
}

export const searchUsers = async (req, res) => {
    const {username: username} = req.params;
    const loggedInUser = req.user.username;

    try {
        const users = await User.find({username: {$regex: `^${username}`, $ne: loggedInUser }})

        res.status(200).json(users);
    } catch (e) {
        console.log('error in searchUsers ', e)
        res.status(500).json({error: 'Internal server error'})
    }
}


