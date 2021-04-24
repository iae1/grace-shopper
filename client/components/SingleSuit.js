import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleSuit } from '../store/suits';

class SingleSuit extends Component {
  constructor() {
    super();
    this.state = {
      fit: '',
      size: '',
      length: '',
      quantity: 1,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.loadSingleSuit(id);
  }

  addToCart() {
    // grab a shallow copy of state
    // set quantity to the current state
    const itemDetails = {
      ...this.props.singleSuit,
      // fit: this.state.fit,
      // size: this.state.size,
      // length: this.state.length,
      quantity: this.state.quantity,
    };
    // if there is no user and no cart in local storage
    if (!localStorage.cart) {
      // call localStorage setItem('cart')
      // convert item details to string and attach to cart
      localStorage.setItem('cart', JSON.stringify([itemDetails]));
      console.log(localStorage);
    } else {
      // call localStorage getItem('cart')
      // convert the string into a JSON object
      let cart = JSON.parse(localStorage.getItem('cart'));
      // check to see if item is already in cart
      // default false
      let isItemInCart = false;
      // convert object to an array
      // forEach to iterate through list of items
      // if current id matches an id in cart set to true
      Object.keys(cart).forEach((item) => {
        if (item.id === itemDetails.id) isItemInCart = true;
      });
      // declare an empty cart
      let newCart = [];
      // if item is in cart
      // map through the products
      if (isItemInCart) {
        // update newCart with changes in quantity
        newCart = cart.map((item) => {
          if (item.id === itemDetails.id) {
            item.quantity =
              // all data is currently string
              // coerce to number and add additional quantity
              Number(item.quantity) + Number(itemDetails.quantity);
          }
          // if false add the item to the array
          return item;
        });
      } else {
        // otherwise simply push the item into the cart
        cart.push(itemDetails);
        // update newCart value
        newCart = cart;
      }
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  }

  handleClick(e) {
    if (!e.target.className) {
      e.target.className = 'clicked';
    } else {
      e.target.className = '';
    }

    if (e.target.value === this.state[e.target.name]) {
      this.setState({
        [e.target.name]: '',
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.fit || !this.state.size || !this.state.length) {
      alert('please select an option for each sizing field!');
      return;
    }

    const order = {
      price: this.props.singleSuit.price,
      fit: this.state.fit,
      size: this.state.size,
      length: this.state.length,
      // orderId: '',
      productId: this.props.singleSuit.id,
    };

    // console.log(order);

    // when order is submitted, it should dispatch a thunk, which will be a post request to Order Details
    // example: addOrderToCart(order)
  }

  render() {
    console.log(this.props);
    const { singleSuit } = this.props;

    return (
      <div className='single-item'>
        <div>
          {!singleSuit ? (
            <h3>NO SUIT!</h3>
          ) : (
            <div>
              <h1>
                {singleSuit.name} {singleSuit.category} - {singleSuit.color}
              </h1>
              <h2>${singleSuit.price}</h2>
              <p>{singleSuit.description}</p>
              <img
                src={singleSuit.imageUrl}
                alt='Prince Philip'
                width='250'
                height='300'
              />
            </div>
          )}
        </div>

        <form id='size-form' onSubmit={this.handleSubmit}>
          <label htmlFor='fit'>Fit:</label>
          <button
            type='button'
            name='fit'
            onClick={this.handleClick}
            value='slim'
          >
            Slim
          </button>
          <button
            type='button'
            name='fit'
            onClick={this.handleClick}
            value='classic'
          >
            Classic
          </button>

          <br />
          <br />

          <label htmlFor='size'>Size:</label>
          <button
            type='button'
            name='size'
            onClick={this.handleClick}
            value='36'
          >
            36
          </button>
          <button
            type='button'
            name='size'
            onClick={this.handleClick}
            value='38'
          >
            38
          </button>
          <button
            type='button'
            name='size'
            onClick={this.handleClick}
            value='40'
          >
            40
          </button>
          <button
            type='button'
            name='size'
            onClick={this.handleClick}
            value='42'
          >
            42
          </button>
          <button
            type='button'
            name='size'
            onClick={this.handleClick}
            value='44'
          >
            44
          </button>
          <button
            type='button'
            name='size'
            onClick={this.handleClick}
            value='46'
          >
            46
          </button>
          <button
            type='button'
            name='size'
            onClick={this.handleClick}
            value='48'
          >
            48
          </button>
          <button
            type='button'
            name='size'
            onClick={this.handleClick}
            value='50'
          >
            50
          </button>

          <br />
          <br />

          <label htmlFor='length'>Length:</label>
          <button
            type='button'
            name='length'
            onClick={this.handleClick}
            value='short'
          >
            Short
          </button>
          <button
            type='button'
            name='length'
            onClick={this.handleClick}
            value='regular'
          >
            Regular
          </button>
          <button
            type='button'
            name='length'
            onClick={this.handleClick}
            value='long'
          >
            Long
          </button>

          <br />
          <br />

          <button
            type='submit'
            className='add-to-cart'
            onClick={this.addToCart}
          >
            Add to Cart
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  singleSuit: state.suits.singleSuit,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  loadSingleSuit: (suitId) => dispatch(fetchSingleSuit(suitId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleSuit);
