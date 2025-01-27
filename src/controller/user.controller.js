const userService = require('../services/user.service');

const getUserProfile = async (req,res) => {

    try {
        const jwt = req.headers.authorization?.split(" ")[1];
        if(!jwt) {
            return res.status(401).json({message: "Unauthorized, Token not found"});
        }
        const user = await userService.getUserProfileByToken(jwt);

        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).send(user);
    }
    catch(error) {
        return res.status(500).send({ error: error.message });
    }
} 

const getAllusers = async (req,res) => {

    try{
        const users = await userService.getAllUsers();
        return res.status(200).send(users);
    }   
    catch(error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    getUserProfile,
    getAllusers
}