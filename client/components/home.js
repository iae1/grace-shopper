import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchCart } from '../store/cart'

/**
 * COMPONENT
 */
export class Home extends Component {
  async componentDidMount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      await this.props.fetchCart(token);
    }
  }
  render() {
    return (
      <div className="homepage-text">
        <h1>Welcome to our shop!</h1>
        <p>
          Philip's suits was founded in 2021 by a group of young creatives seeking to cash in on the legacy of a man who had recently died. Although Prince Philip was of dubious moral character, he was very handsome and had an impeccable sense of style. For that, we honor his legacy, and try ourselves to profit as much as we are able off of his already tarnished name
. We hope that you enjoy your experience shopping with us. For Prince Philip's sake- and your own.      </p>
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
