import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>Philip's Suits: Fit for a Consort</h1>
    <nav>

      {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/">Home</Link>
            <Link to="#" onClick={handleClick}>
              Logout
            </Link>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
      )}

      <img src="https://www.spierandmackay.com//files/shopping-bag.png" />

      <br />
      <br />

      <Link to="/suits">Suits</Link><Link to="/sportcoats">Sportcoats</Link><Link to="/sportcoats">Trousers</Link><Link to="/sportcoats">Shirts</Link>

    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
