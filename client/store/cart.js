import axios from "axios";


const TOKEN = 'token'

//ACTION CONSTANTS
const UPDATE_CART = "UPDATE_CART"

//ACTION CREATORS
export const updateCart = (cart) => {
  return {
    type: UPDATE_CART,
    cart
  }
}

//THUNK CREATORS
export const addProductToCart = (orderItem) => {
  return async (dispatch) => {
    try {
      const { data: cart } = await axios.post(`/api/users/cart/${orderItem.id}`,
      orderItem
      )
      dispatch(updateCart(cart))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateProductInCart = (orderItem) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN)
      const { data: cart } = await axios.put(`/api/users/cart/${orderItem.id}`,{
      orderItem
      }
      )
      dispatch(updateCart(cart))
    } catch (error) {
      
    }
  }
}

//INITIAL STATE
const initState = {
  cart: []
}

//REDUCER
export default function cartReducer (state = initState, action) {
  switch (action.type) {
    case UPDATE_CART:
      return { ...state, cart: action.cart}
    default:
      return state;
  }
}
