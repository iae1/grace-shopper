import axios from "axios";

//ACTION CONSTANTS
const SET_CART = "SET_CART"

//ACTION CREATOR
export const setCart = (cart) => {
  return {
    type: SET_CART,
    cart
  }
}

//THUNK CREATOR
export const fetchCart = () => {
  return async (dispatch) => {
    try {
      const { data: cart } = await axios.get('/api/users/cart')
      dispatch(setCart(cart))
    } catch (error) {
      console.log(error)
    }
  }
}

//INITIAL STATE
const initState = {
  cart: {}
}

export default function suitsReducer (state = initState, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart
    default:
      return state;
  }
}
