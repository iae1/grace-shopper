import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import thunks
import { fetchCart, updateProductInCart } from '../store/cart';

let cart = {
  products: [
    {
      id: 5,
      name: 'Henry',
      category: 'Suit',
      imageUrl: 'https://www.stevensegallery.com/320/180',
      color: 'Charcoal',
      price: 600,
      description: 'Go for smokey and smoldering.',
      createdAt: '2021-04-23T20:49:10.275Z',
      updatedAt: '2021-04-23T20:49:10.275Z',
      order_details: {
        quantity: 3,
        price: 1800,
        fit: 'classic',
        size: '43',
        length: null,
        createdAt: '2021-04-23T20:49:10.296Z',
        updatedAt: '2021-04-23T20:49:10.296Z',
        orderId: 2,
        productId: 5,
      },
    },
    {
      id: 6,
      name: 'James',
      category: 'Suit',
      imageUrl: 'https://www.stevensegallery.com/320/180',
      color: 'Khaki',
      price: 600,
      description: 'A suit for the summer.',
      createdAt: '2021-04-23T20:49:10.275Z',
      updatedAt: '2021-04-23T20:49:10.275Z',
      order_details: {
        quantity: 1,
        price: 600,
        fit: 'slim',
        size: '40',
        length: 'regular',
        createdAt: '2021-04-26T16:26:15.291Z',
        updatedAt: '2021-04-26T16:26:15.291Z',
        orderId: 2,
        productId: 6,
      },
    },
  ],
};

export class Cart extends React.Component {
  constructor() {
    super();
    // bind handlers
  }
  componentDidMount() {
    // fetch cart data
    // this isn't working...throwing an authentication error...
    // this.props.loadCart();
    // else localStorage.getItem('cart')
  }

  //to remove the item completely
  handleRemoveItem(id) {
    this.props.removeItem(id);
  }

  // how do we want to handle quantity adjustmens?
  // within the backend like total price? or via the handlers

  //to add the quantity
  handleIncrementQuantity(id) {
    const orderItem = {
      id: this.props.singleSuit.id,
      fit: this.state.fit,
      size: this.state.size,
      length: this.state.length,
      token,
    };

    if (this.props.isLoggedIn) {
      if (
        this.props.singleSuit.id === this.props.cart[i].id &&
        orderItem.fit === this.props.cart[i].fit &&
        orderItem.size === this.props.cart[i].size &&
        orderItem.length === this.props.cart[i].length
      ) {
        orderItem.quantity + 1;
        return this.props.updateProductInCart(orderItem);
      }
    }
  }
  //to substruct from the quantity
  handleDecrementQuantity(id) {
    this.props.decrementQuantity(id);
  }

  render() {
    console.log(cart);
    console.log(this.props);
    const { products } = cart;
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
    return !products.length ? (
      <p>Cart is empty. Try adding something.</p>
    ) : (
      products.map((item) => {
        return (
          <React.Fragment>
            <li className='itemCollection' key={item.id}>
              <div className='itemImg'>
                <img src={item.imageUrl} />
              </div>
              <div className='itemDesc'>
                <span className='name'>{item.name}</span>
                <p>
                  <b>Price: {item.price}$</b>
                </p>
                <p>
                  <b>Quantity: {item.quantity}</b>
                </p>
                <div className='add-remove'>
                  <Link to='/cart'>
                    <i
                      className='cart-icons'
                      onClick={() => {
                        this.handleIncrementQuantity(item.id);
                      }}
                    >
                      +
                    </i>
                  </Link>
                  <Link to='/cart'>
                    <i
                      className='cart-icons'
                      onClick={() => {
                        this.handleDecrementQuantity(item.id);
                      }}
                    >
                      -
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
          </React.Fragment>
        );
      })
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadCart: () => dispatch(fetchCart()),
});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     removeItem: (id) => {
//       dispatch(removeItem(id));
//     },
//     incrementQuantity: (id) => {
//       dispatch(incrementQuantity(id));
//     },
//     decrementQuantity: (id) => {
//       dispatch(decrementQuantity(id));
//     },
//   };
// };

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
