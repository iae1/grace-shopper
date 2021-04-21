import axios from "axios";

//ACTION CONSTANTS

const SET_SUITS = "SET_SUITS"

//ACTION CREATOR

export const setSuits = (suits) => {
  return {
    type: SET_SUITS,
    suits
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

//INITIAL STATE

const initState = {
  allSuits: [],
  singleSuit: {}
}

export default function suitsReducer (state = initState, action) {
  switch (action.type) {
    case SET_SUITS:
      return { ...state, allSuits: [...action.suits]}
    default:
      return state;
  }
}
