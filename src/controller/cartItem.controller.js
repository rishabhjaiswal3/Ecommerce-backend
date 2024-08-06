const cartItemService = require("../services/cartItem.service");


const updateCartItem = async () => {

    const user = req.user;

    try {
        const updateCartItem = await cartItemService.updateCartItem(user?._id,req.params.id,req.body);
        return res.status(200).send(updatedCartItem);
    }   
        catch(error) {
            return res.status(500).send({error:error.message});
    }

}

const remoteCartItem = async (req,res) => {

    const user = req.user;

    try {
        await cartItemService.removeCartItem(user?._id,req.params.id)
        return res.status(200).send({message:"Cart Item removed Successfully"});
    }   
        catch(error) {
            return res.status(500).send({error:error.message});
    }

}

module.exports = {
    updateCartItem,
    removeCartItem
}