const cartService = require("../services/cart.service");
const Address = require("../models/address.model");
const Order = require("../models/order.model");

async function createOrder(user, shippAddress) {
  let address;

  if (shippAddress?._id) {
    let existedAddress = await Address.findById(shippAddress?._id);
    address = existedAddress;
  } else {
    address = new Address(shippAddress);
    address.user = user;
    await address.save();
    user.address.push(address);
    await user.save();
  }

  const cart = await cartService.findUserCart(user?._id);
  const orderItems = [];

  for (const item of cart.cartItems) {
    const orderItem = new orderItems({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      size: item.size,
      userId: item.userId,
      discountedPrice: item.discountedPrice,
    });
    const createOrderItem = await orderItem.save();
    orderItems.push(createOrderItem);
  }

  const createOrder = new Order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    totalItem: cart.totalItem,
    shippingAddress: address,
  });

  const savedOrder = await createOrder.save();

  return saveOrder;
}

async function placeOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "PLACED";
  order.paymentDetails.status = "COMPLETED";

  return await order.save();
}

async function confirmedOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "CONFIRMED";

  return await order.save();
}

async function shipedOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "SHIPPED";
  return await order.save();
}

async function deliverOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "DELIVERED";
  return await order.save();
}

async function cancelOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "CANCELLED";
  return await order.save();
}

async function findOrderById(orderId) {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingADdress");
  return order;
}

async function userOrderHisotry(userId) {
  try {
    const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
      .populate({ path: "orderItmes", populate: { path: "product" } })
      .lean();
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllOrder() {
  const orders = await Order.find()
    .populate({ path: "orderItmes", populate: { path: "product" } })
    .lean();
  return orders;
}

async function deleteOrder(orderId) {
  const order = await findOrderById(orderId);
  await Order.findByIdAndDelete(order?._id);
}

module.exports = {
  createOrder,
  placeOrder,
  confirmedOrder,
  shipedOrder,
  deliverOrder,
  cancelOrder,
  findOrderById,
  userOrderHisotry,
  getAllOrder,
  deleteOrder,
};
