import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderConfirmation from './OrderConfirmation';
import { deleteItemInCart, updateProductInCart } from '../store/cart';

// global

let guestCart = [];

export class Cart extends React.Component {
  constructor() {
    super();
    // bind handlers
    this.handleQuantity = this.handleQuantity.bind(this);
  }

  componentDidMount() {
    // if user is not logged in there will be no token in local storage
    if (this.props.auth.id === undefined) {
      if (
        JSON.parse(localStorage.getItem('cart')) &&
        JSON.parse(localStorage.getItem('cart')).length
      ) {
        guestCart = JSON.parse(localStorage.getItem('cart'));
      }
    }
    // const token = window.localStorage.getItem('token');
    // if (token) {
    //   this.props.fetchCart(token);
    //   // // iterate over cart
    //   const itemsInCart = this.props.cart.cart.products;
    // }
  }

  //to remove the item completely
  handleRemoveItem(id) {
    const orderItem = { id, token }
    this.props.removeItem(orderItem);
  }

  // how do we want to handle quantity adjustmens?
  // within the backend like total price? or via the handlers

  //to add the quantity
  handleQuantity(e) {
    if (e.target) {
      let orderItem = {
        id: e.target.name,
        quantity: parseInt(e.target.value, 10),
        token,
      };
      this.props.updateProductInCart(orderItem);
    }
  }
  // let orderItem = {};
  // let productsInCart = this.props.cart.cart.products;
  // for (let i = 0; i < productsInCart.length; i++) {
  //   if (
  //     id === productsInCart[i].id
  //     // orderItem.fit === this.props.cart[i].fit &&
  //     // orderItem.size === this.props.cart[i].size &&
  //     // orderItem.length === this.props.cart[i].length
  //   ) {
  //     orderItem.id = id;
  //     orderItem.token = token;
  //     orderItem.quantity = productsInCart[i].order_details.quantity + 1;
  //     return updateProductInCart(orderItem);
  //   }
  // }
  

  render() {
    console.log(this.props);
    const { cart } = this.props;
    if (this.props.auth.id) {
      return cart.cart.products && cart.cart.products.length ? (
        cart.cart.products.map((item) => {
          return (
            <React.Fragment>
              <div>
                <li className='itemCollection' key={item.id}>
                  <div className='itemImg'>
                    <img src={item.imageUrl} width='360px' length='360px' />
                  </div>
                  <div className='itemDesc'>
                    <span className='name'>{item.name}</span>
                    <p>
                      <b>Price: ${item.price}</b>
                    </p>
                    <p>
                      <b>Quantity: {item.quantity}</b>
                    </p>
                    <div className='add-remove'>
                      <Link to='/cart'>
                        <i
                          className='productQuantity'
                          onClick={() => {
                            this.handleQuantity(item.id);
                          }}
                        >
                          <select name={item.id} onChange={this.handleQuantity}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                          </select>
                        </i>
                      </Link>
                    </div>
                    <button
                      className='removeButton'
                      onClick={() => {
                        this.handleRemoveItem(item.id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              </div>
            </React.Fragment>
          );
        })
      ) : (
        <p>Cart is empty. Try adding something.</p>
      );
    } else {
      let cart = JSON.parse(localStorage.getItem('cart'));
      return cart && cart.length ? (
        <div>
          {cart.map((item) => {
            console.log(cart);
            return (
              <li className='itemCollection' key={item.id}>
                <div className='itemImg'>
                  <img
                    src='https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg'
                    width='360px'
                    height='360px'
                  />
                </div>
                <div className='itemDesc'>
                  <span className='name'>{item.name}</span>
                  <p>
                    <b>Price: ${item.price}</b>
                  </p>
                  <p>
                    <b>Quantity: {item.order_details.quantity}</b>
                  </p>
                  <div className='add-remove'>
                        <select name={item.id} onChange={this.handleQuantity}>
                          <option value='1'>1</option>
                          <option value='2'>2</option>
                          <option value='3'>3</option>
                          <option value='4'>4</option>
                          <option value='5'>5</option>
                          <option value='6'>6</option>
                        </select>
                  </div>
                  <button
                    className='removeButton'
                    onClick={() => {
                      this.handleRemoveItem(item.id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </li>
            </div>
          </React.Fragment>
          )
                  
        )
        }
          <div>
            <Link to={'/checkout'}>
              <h4>Checkout</h4>
            </Link>
          </div>;
        </div>
    ) : (
      <p>Cart is empty. Try adding something.</p>
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
    removeItem: (orderItem) => {
      dispatch(deleteItemInCart(orderItem));
    },
    updateProductInCart: (orderItem) => {
      dispatch(updateProductInCart(orderItem));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
