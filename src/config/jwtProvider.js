const jwt = require('jsonwebtoken');

const SECRET_KEY = "sladljfaslhtovjklsfbvlkakolhfoiwaqletbnmsdz;lhaskdfb,vdzdfsa"

const generateToken = (userId,role) => {
    const token = jwt.sign({
        userId,
        role
    },SECRET_KEY,{expiresIn:"48h"})

    return token;
}

const getUserIdFromToken = (token) => {
    const decodedToken = jwt.verify(token,SECRET_KEY);
    const userId = decodedToken.userId;
    return userId;
}

module.exports = {
    generateToken,
    getUserIdFromToken
}