const userService = require("../services/user.service");
const cartService = require("../services/cart.service");

async function updateCartItem(userId, cartItemId, cartItemData) {
  try {
    const item = await findCartItemById(cartItemId);

    if (!item) {
      throw new Error("Cart item not found", cartItemId);
    }
    const user = await userService.findUserById(item.userId);
    if (!user) {
      throw new Error("User not found ", userId);
    }

    // 10 * 399

    if (user?._id.toString() === userId.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;

      const updatedCartItem = await item.save();
      return updatedCartItem;
    } else {
      throw new Error(" you can't update this cart item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function removeCartItem(userId, cartItemId) {
  try {
    const cartItem = await cartService.findCartItemById(cartItemId);
    const user = await userService.findUserById(userId);

    if (user._id.toString() == cartItem.userId.toString()) {
      await cartItem.findByIdAndDelete(cartItem);
    }
    throw new Error("you can remove another user's item");
  } catch (error) {
    throw new Error(error.message);
  }
}

async function fundCartItemById(cartItemId) {
  const cartItem = await findCartItemById(cartItemId);
  if (cartItem) {
    return cartItem;
  } else {
    throw new Error("cart item not found ");
  }
}

module.exports = { updateCartItem, removeCartItem, fundCartItemById };
