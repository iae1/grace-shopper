import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchCart } from '../store/cart'

/**
 * COMPONENT
 */
export class Home extends Component {
  async componentDidMount() {
    const token = window.localStorage.getItem('token');
    console.log("TOKEN--->", token)
    await this.props.fetchCart(token);
  }
  render() {
    return (
      <div>
        <h1>Welcome to our shop!</h1>
        <p>
          Please buy our stuff!
        </p>
      </div>
    )
  }
}

// export const Home = props => {
//   const {username} = props

//   return (
//     <div>
//       <h1>Welcome to our shop!</h1>
//       <p>
//         Please buy our stuff!
//       </p>
//     </div>
//   )
// }

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: (token) => dispatch(fetchCart(token))
  }
}

export default connect(mapState, mapDispatch)(Home)
