import axios from "axios";

//ACTION CONSTANTS
const ADD_TO_CART = "ADD_TO_CART"
const UPDATED_IN_CART = "UPDATED_IN_CART"

//ACTION CREATORS
export const addedProductToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product
  }
}

export const updatedProductInCart = (product) => {
  return {
    type: UPDATED_IN_CART,
    product
  }
}

//THUNK CREATORS
export const addProductToCart = (productId) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.post(`/api/users/cart/${productId}`)
      dispatch(addedProductToCart(product))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateProductInCart = (productId) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.put(`/api/users/cart/${productId}`)
      dispatch(updatedProductInCart(product))
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
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.product] }
    case UPDATED_IN_CART:
      const updatedCart = state.cart()
  }
}
