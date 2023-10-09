const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
    try {
        const { username, names, password, email } = req.body;

        const usernameCheck = await User.findOne({username});
    
        if(usernameCheck) {
            return res.json({msg: "Username already used", status: false});
        }
    
        const emailCheck = await User.findOne({email});
    
        if(emailCheck) {
            return res.json({msg: "Email already used", status: false});
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await User.create({
            email, 
            username,
            names,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({status: true, user});
    } catch (err) {
        next(err);
    }
    

}

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({username});
    
        if(!user) {
            return res.json({msg: "Incorrect username or password", status: false});
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if(!isPasswordValid) {
            return res.json({msg: "Incorrect username or password", status: false});
        }

        delete user.password;


        return res.json({status: true, user});


    } catch (err) {
        next(err);
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select([
            "email",
            "username",
            "avatarImg",
            "_id",
            "names"
        ]);
        res.json({status: true, users});
    } catch(error) {
        console.error('Something went wrong!', error);
    }
}


module.exports.updateAvatar = async (req, res, next) => {
    try {
        const { userId, avatar } = req.body;

        const user = await User.findById(userId);
    
        if(!user) {
            return res.status(404).json({ message: 'User not found', status: false });
        }

        user.avatarImg = avatar;

        await user.save();

        return res.json({message:'User info updated', status: true, user});


    } catch (err) {
        next(err);
    }
}