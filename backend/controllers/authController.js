import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import generateToken from "../utils/generateToken.js";

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '')

        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error: 'Invalid username or password'})
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePicture: user.profilePicture,
        });

    } catch (error) {
        console.log(error.message + ' Ошибка')
        res.status(500).json({error: 'Ошибка сервера!'})
    }

}

export const logout = (req, res) => {
    try {
       res.cookie('jwt', '', {maxAge: 0});
       res.status(200).json({message: 'Успешно вышел из аккаунта!'});
    } catch (error) {
        console.log(error.message + ' Ошибка')
        res.status(500).json({error: 'Ошибка сервера!'})
    }
}

export const signup = async (req, res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error: 'Пароли не совпадают!'});
        }

        const user = await User.findOne({username});

        if(user) {
            return res.status(400).json({error: 'Пользователь уже есть!'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const ProfilePic = `https://avatar.iran.liara.run/username?username=${fullName}+`

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePicture: ProfilePic
        })

        if(newUser) {

            generateToken(newUser._id, res)

            await newUser.save();

            res.status(201).json({
                _id: newUser.id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePicture: newUser.profilePicture,
            });
        } else {
            res.status(400).json({error: 'Invalid user data'})
        }

    } catch (error) {
        console.log(error.message + ' Ошибка')
        res.status(500).json({error: 'Ошибка сервера!'})
    }
}