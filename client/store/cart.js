import axios from "axios";

//ACTION CONSTANTS
const SET_CART = "SET_CART"

//ACTION CREATORS
export const setCart = (cart) => {
  return {
    type: SET_CART,
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
      dispatch(setCart(cart))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchCart = (token) => {
  return async (dispatch) => {
    try {
      const { data: cart } = await axios.get('/api/users/cart', {
        headers: {
          authorization: token
        }
      })
      console.log("cart", cart)
      dispatch(setCart(cart))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateProductInCart = (orderItem) => {
  return async (dispatch) => {
    try {
      const { data: cart } = await axios.put(`/api/users/cart/${orderItem.id}`,
      orderItem
      )
      dispatch(setCart(cart))
    } catch (error) {

    }
  }
}

export const deleteItemInCart = (orderItem) => {
  return async (dispatch) => {
    try {
      const { data: cart } = await axios.delete(`/api/users/cart/${orderItem.id}`,{
        headers: {
          authorization: orderItem.token
        }
      }
      )
      dispatch(setCart(cart))
    } catch (error) {
      console.log(error)
    }
  }
}

export const checkoutLoggedUser = (checkoutOrder) => {
  return async (dispatch) => {
    try {
      const { data: cart } = await axios.put(`/api/users/cart`,
      checkoutOrder
      )
      dispatch(setCart(cart))
    } catch (error) {
      console.log(error)
    }
  }
}

export const checkoutGuestUser = (checkoutOrder) => {
  return async (dispatch) => {
    try {
      const { data: cart } = await axios.post(`/api/orders`,
      checkoutOrder
      )
      dispatch(setCart(cart))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchGuestCart = (email) => {
  return async (dispatch) => {
    try {
      const { data: cart } = await axios.get(`/api/orders/cart`, {
        headers: {
          email: email
        }
      }
      )
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

//REDUCER
export default function cartReducer (state = initState, action) {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.cart}
    default:
      return state;
  }
}
