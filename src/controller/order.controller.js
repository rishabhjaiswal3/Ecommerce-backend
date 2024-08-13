const orderService = require('../services/order.service');

const createOrder = async (req,res) => {

    const user = await req.order;
    try {
        let createdOrder = await orderService.createOrder(user,req.body);
        return res.status(201).send(createdOrder)
    }
    catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const findOrderById = async (req,res) => {

    const user = await req.order;
    try {
        let Order = await orderService.findOrderById(req.params.id);
        return res.status(201).send(Order)
    }
    catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const userOrderHistory = async (req,res) => {

    const user = await req.order;
    try {
        let Orders = await orderService.userOrderHisotry(user?._id);
        return res.status(201).send(Orders)
    }
    catch (error) {
        return res.status(500).send({error:error.message});
    }
}

module.exports = {
    createOrder,
    findOrderById,
    userOrderHistory
}