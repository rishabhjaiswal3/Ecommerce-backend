const orderService = require('../services/order.service');

const getAllOrders = async (req,res) => {

    try {
        const order = await orderService.getAllOrders();
        return res.status(200).send(orders);        
    }   
    catch(error) {
        throw new Error(error.message);
    }
}

const confirmeOrders = async (req,res) => {

    const orderId = req.params.orderId;
    try {
        const order = await orderService.confirmedOrder(orderId);
        return res.status(200).send(orders);        
    }   
    catch(error) {
        throw new Error(error.message);
    }
}


const shippOrders = async (req,res) => {

    const orderId = req.params.orderId;
    try {
        const order = await orderService.shippOrders(orderId);
        return res.status(200).send(orders);        
    }   
    catch(error) {
        throw new Error(error.message);
    }
}

const deliverOrders = async (req,res) => {

    const orderId = req.params.orderId;
    try {
        const order = await orderService.deliverOrder(orderId);
        return res.status(200).send(orders);        
    }   
    catch(error) {
        throw new Error(error.message);
    }
}


const cancelOrders = async (req,res) => {

    const orderId = req.params.orderId;
    try {
        const order = await orderService.cancelOrder(orderId);
        return res.status(200).send(orders);        
    }   
    catch(error) {
        throw new Error(error.message);
    }
}

const deleteOrders = async (req,res) => {

    const orderId = req.params.orderId;
    try {
        const order = await orderService.deleteOrder(orderId);
        return res.status(200).send(orders);        
    }   
    catch(error) {
        throw new Error(error.message);
    }
}


module.exports = {
    getAllOrders,
    confirmeOrders,
    shippOrders,
    deliverOrders,
    cancelOrders,
    deleteOrders,
}