import {createContext} from 'react'

const CartContext = createContext({
  restaurantData: [],
  updateRestaurantData: () => {},
  currentDishCategory: '',
  updateCurrentDishCategory: () => {},
  restaurantName: '',
  updateRestaurantName: () => {},
  currentDishList: {},
  updateCurrentDishList: () => {},
  increaseItemQuantity: () => {},
  decreaseItemQuantity: () => {},
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  removeAllCartItems: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
