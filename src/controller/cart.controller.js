const cartService = require('../services/cart.service');

const findUserCart = async (req,res) => {

    const user = req.user;
    try {
        const cart = await cartService.findUserCart(user?._id);
        return res.status(200).send(cart);
    }
    catch(error) {
        throw new Error(error.message);
    }

}

const addItemtoCart = async (req,res) => {

    const user = req.user;
    try {
        const cartItem = await cartService.addCartItem(user?._id,req.body);
        return res.status(200).send(cartItem);
    }
    catch(error) {
        throw new Error(error.message);
    }
}


module.exports = {
    addItemtoCart,
    findUserCart
}