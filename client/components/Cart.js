import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderConfirmation from './OrderConfirmation';
import { deleteItemInCart, updateProductInCart } from '../store/cart';

// global
const token = window.localStorage.getItem('token');

export class Cart extends React.Component {
  constructor() {
    super();
    // bind handlers
    this.handleQuantity = this.handleQuantity.bind(this);
  }

  componentDidMount() {
    // const token = window.localStorage.getItem('token');
    // if (token) {
    //   this.props.fetchCart(token);
    //   // // iterate over cart
    //   const itemsInCart = this.props.cart.cart.products;
    // }
  }
  // else localStorage.getItem('cart')

  //to remove the item completely
  handleRemoveItem(id) {
    const orderItem = { id, token }
    console.log('token0--->', token)
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
  
  handleCheckout () {
    
  }

  render() {
    console.log(this.props);
    const { cart } = this.props;
    // const { products } = cart;
    // const { cart } = this.props;
    //   return (
    //       <div>
    //         <h1>Cart</h1>
    //         {!cart ? (
    //           <p>Cart is empty. Try adding something.</p>
    //         ) : (
    //           <div>
    //             <h1>hello</h1>
    //           </div>
    //         )}
    //       </div>
    //   );
    // }

    // Morgan's code below - this was breaking, but probably better to use overall

    // render() {
    return cart.cart.products && cart.cart.products.length ? (
      <div>
      {
      cart.cart.products.map((item) => 
        ( 
          <React.Fragment key={item.id}>
            <div>
              <li className='itemCollection' >
                <div className='itemImg'>
                  <img src={item.imageUrl} />
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
