import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkoutLoggedUser, checkoutGuestUser } from '../store/cart';

// global
const token = window.localStorage.getItem('token');

export class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      address: '',
      name: '',
      email: '',
      nameError: '',
      emailError: '',
      addressError: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleStateChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  validate() {
    let nameError = '';
    let emailError = '';
    let addressError = '';

    if (!this.state.name) {
      nameError = 'Order must include name';
    }

    if (!this.state.address) {
      addressError = 'Order must include address';
    }

    if (!this.state.email) {
      emailError = 'Order must include email';
    }

    if (nameError || addressError || emailError) {
      this.setState({ nameError, addressError, emailError });
      return false;
    }

    return true;
  }

  handleSubmit(e) {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      const address = this.state.address;
      const email = this.state.email;
      if (this.props.auth.id) {
        // if the user is logged in
        this.props.checkoutLoggedUser({ address, token });
        console.log('cart--->', this.props.cart);
        // this.props.history.push('/orderconfirmation')
      } else {
        //need to pull cart off of local storage... waiting on morgan
        const guestCart = JSON.parse(localStorage.getItem('cart'));
        const cartItems = [];
        for (let i = 0; i < guestCart.length; i++) {
          cartItems.push({
            quantity: parseInt(guestCart[i].quantity, 10),
            fit: guestCart[i].fit,
            size: guestCart[i].size,
            length: guestCart[i].length,
            productId: guestCart[i].id,
          });
        }
        console.log('cart items--->', cartItems);
        this.props.checkoutGuestUser({ email, address, cartItems });
        console.log('guest cart--->', this.props.cart);
      }
      this.props.history.push('/orderconfirmation');
      localStorage.clear();
    }
  }

  render() {
    let totalPrice = 0;
    let guestCart;
    if (this.props.auth.id) {
      const products = this.props.cart.cart.products;
      console.log('products--->', products);
      for (let i = 0; i < products.length; i++) {
        totalPrice += products[i].price * products[i].order_details.quantity;
      }
    } else {
      guestCart = JSON.parse(localStorage.getItem('cart'));
      for (let i = 0; i < guestCart.length; i++) {
        totalPrice += guestCart[i].price;
      }
    }
    // console.log('totalPrice', totalPrice)
    return (
      <React.Fragment>
        <div id='total-price'>
          Total Price: ${totalPrice > 0 ? totalPrice : null}
        </div>
        <form id='checkout-cart-form' onSubmit={this.handleSubmit}>
          <label htmlFor='name'>Your Name:</label>
          <input
            name='name'
            value={this.state.name}
            onChange={this.handleStateChange}
            placeholder='required'
          />
          {this.state.nameError ? (
            <div style={{ color: 'red ' }}>{this.state.nameError}</div>
          ) : null}
          <label htmlFor='address'>Your Billing/Shipping Address:</label>
          <input
            name='address'
            value={this.state.address}
            onChange={this.handleStateChange}
            placeholder='required'
          />
          {this.state.addressError ? (
            <div style={{ color: 'red ' }}>{this.state.addressError}</div>
          ) : null}
          <label htmlFor='email'>Your Email:</label>
          <input
            name='email'
            value={this.state.email}
            onChange={this.handleStateChange}
            placeholder='required'
          />
          {this.state.emailError ? (
            <div style={{ color: 'red ' }}>{this.state.emailError}</div>
          ) : null}
          <button type='submit'>Submit Order</button>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkoutLoggedUser: (info) => {
      dispatch(checkoutLoggedUser(info));
    },
    checkoutGuestUser: (info) => {
      dispatch(checkoutGuestUser(info));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
