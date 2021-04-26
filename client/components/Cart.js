import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import thunks
import { fetchCart } from '../store/cart';

export class Cart extends React.Component {
  componentDidMount() {
    // fetch cart data
    // this isn't working...throwing an authentication error...
    this.props.loadCart();

    // else localStorage.getItem('cart')
  }

  //to remove the item completely
  handleRemoveItem(id) {
    this.props.removeItem(id);
  };
  //to add the quantity
  handleIncrementQuantity(id) {
    this.props.incrementQuantity(id);
  };
  //to substruct from the quantity
  handleDecrementQuantity(id) {
    this.props.decrementQuantity(id);
  };

  render() {
    console.log(this.props);
    const { cart } = this.props;

    return (
        <div>
          <h1>Cart</h1>
          {!cart ? (
            <p>Cart is empty. Try adding something.</p>
          ) : (
            <div>
              <h1>hello</h1>
            </div>
          )}
        </div>
    );
  }


  // Morgan's code below - this was breaking, but probably better to use overall

  // render() {
  //   this.props.cart.length ? (
  //     this.props.cart.map((item) => {
  //       return (
  //         <li className='itemCollection' key={item.id}>
  //           <div className='itemImg'>
  //             <img src={item.img} />
  //           </div>
  //           <div className='itemDesc'>
  //             <span className='name'>{item.name}</span>
  //             <p>{item.desc}</p>
  //             <p>
  //               <b>Price: {item.price}$</b>
  //             </p>
  //             <p>
  //               <b>Quantity: {item.quantity}</b>
  //             </p>
  //             <div className='add-remove'>
  //               <Link to='/cart'>
  //                 <i
  //                   className='cart-icons'
  //                   onClick={() => {
  //                     this.handleIncrementQuantity(item.id);
  //                   }}
  //                 >
  //                   +
  //                 </i>
  //               </Link>
  //               <Link to='/cart'>
  //                 <i
  //                   className='cart-icons'
  //                   onClick={() => {
  //                     this.handleDecrementQuantity(item.id);
  //                   }}
  //                 >
  //                   -
  //                 </i>
  //               </Link>
  //             </div>
  //             <button
  //               className='removeButton'
  //               onClick={() => {
  //                 this.handleRemoveItem(item.id);
  //               }}
  //             >
  //               Remove
  //             </button>
  //           </div>
  //         </li>
  //       );
  //     })
  //   ) : (
  //     <p>Cart is empty. Try adding something.</p>
  //   );
  // }
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
