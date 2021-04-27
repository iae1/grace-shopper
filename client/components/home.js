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
          Philip's suits was founded in 2021 by a group of young creatives seeking to cash in on the legacy of a man who had recently passed away. Although Prince Philip was of dubious character, he nevertheless was very handsome and had a great sense of style. For that, he honor his legacy, and try ourselves to make as much money as we can, while not sullying his mildly tarnished name.
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
