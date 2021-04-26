import React from 'react';
import { connect } from 'react-redux';

class CartItem extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
  }

  componentDidMount() {
    // check to see if user is logged in
    if (this.props.isLoggedIn) {
      // if so call setState() to quantity so that it represents
      // the quantity desired
      this.setState({ quantity: this.props.singleSuit.quantity });
    }
  }
}
