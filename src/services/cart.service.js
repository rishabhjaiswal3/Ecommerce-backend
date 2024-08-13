const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItems.model");
async function createCart(user) {
  try {
    const cart = new Cart({ user });
    const createCart = await cart.save();
    return createCart;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findUserCart(userId) {
  try {
    let cart = await Cart.findOne({ user: user });

    let cartItems = await CartItem.find({ cart: cart?._id }).populate(
      "product"
    );

    cart.cartItems = cartItems;
    let totalPrice = 0;
    let totalDiscountedPricePrice = 0;
    let totalItem = 0;

    for (let cartItem of cart.cartItems) {
      totalPrice += cartItem.price;
      totalDiscountedPricePrice += cartItem.discountedPrice;
      totalItem += cartItem.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.discount = totalPrice - totalDiscountedPricePrice;
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addCartItem(userId, req) {
  try {
    const cart = await Cart.findOne({ user: userId });
    const product = await Product.findById(req.productId);

    const isPresent = await CartItem.findOne({
      cart: cart?._id,
      product: product._id,
      userId,
    });

    if (!isPresent) 
    {
      const cartItem = new CartItem({
        product: product._id,
        cart: cart?._id,
        quantity: 1,
        userId,
        price: product.price,
        size: req.size,
        discountedPrice: product.discountedPrice,
      });

      const createCartItem = await cartItem.save();
      cart.cartItems.push(createCartItem);
      await cart.save();
      return "Item added to Cart";
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { createCart, addCartItem, findUserCart };
