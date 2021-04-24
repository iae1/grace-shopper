import axios from "axios";

//ACTION CONSTANTS
const SET_SUITS = "SET_SUITS"
const SET_SINGLE_SUIT = "SET_SINGLE_SUIT"
const ADD_TO_CART = "ADD_TO_CART"

//ACTION CREATOR
export const setSuits = (suits) => {
  return {
    type: SET_SUITS,
    suits
  }
}

export const setSingleSuit = (suit) => {
  return {
    type: SET_SINGLE_SUIT,
    suit
  }
}

export const addToCart = (orderItem) => {
  return {
    type: ADD_TO_CART,
    orderItem
  }
}

//THUNK CREATOR
export const fetchSuits = () => {
  return async (dispatch) => {
    try {
      const { data: suits } = await axios.get("/api/products/suits")
      dispatch(setSuits(suits))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchSingleSuit = (suitId) => {
  return async (dispatch) => {
    try {
      const { data: suit } = await axios.get(`/api/products/suits/${suitId}`)
      dispatch(setSingleSuit(suit))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addToCartThunk = (id, productId, orderItem) => {
  return async (dispatch) => {
    try {
      const { data: createdOrderItem } = await axios.post(`/api/${id}/cart/${productId}`, { fit, size, length })
      dispatch(addToCart(createdOrderItem))
    } catch (error) {
      console.log(error)
    }
  }
}

//INITIAL STATE
const initState = {
  allSuits: [],
  singleSuit: {}
}

export default function suitsReducer (state = initState, action) {
  switch (action.type) {
    case SET_SUITS:
      return { ...state, allSuits: [...action.suits]}
    case SET_SINGLE_SUIT:
      return { ...state, singleSuit: action.suit }
    case ADD_TO_CART:
      return { ...state, singleSuit: action.suit }
    default:
      return state;
  }
}
