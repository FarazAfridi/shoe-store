export const addCartItem = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === cartItemToAdd._id
  );
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem._id === cartItemToAdd._id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === cartItemToRemove._id
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem._id !== cartItemToRemove._id);
  }
  return cartItems.map((cartItem) =>
    cartItem._id === cartItemToRemove._id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const getItemCount = (cartItems) =>
  cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0);

export const getTotal = (cartItems) =>
  cartItems.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity , 0);

export const filterItemFromCart = (cartItems, item) => 
  cartItems.filter(cartItem => cartItem._id !== item._id)

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  return null;
};