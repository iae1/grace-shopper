import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart, fetchSingleSuit } from "../store/suits";
import { addToCartThunk } from "../store/suits";
import { addProductToCart, updateProductInCart } from "../store/cart"

class SingleSuit extends Component {
  constructor() {
    super();
    this.state = {
      fit: '',
      size: '',
      length: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.loadSingleSuit(id);
  }

  handleClick(e) {
    if (!e.target.className) {
      e.target.className = 'clicked';
    } else {
      e.target.className = '';
    };

    if (e.target.value === this.state[e.target.name]) {
      this.setState({
        [e.target.name]: ''
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    };
    console.log('state--->', this.state)
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.fit || !this.state.size || !this.state.length) {
      alert('please select an option for each sizing field!');
      return;
    };
    const token = window.localStorage.getItem('token')
    const orderItem = {
      id: this.props.singleSuit.id,
      fit: this.state.fit,
      size: this.state.size,
      length: this.state.length,
      token
    };
    
    for (let i = 0; i < this.props.cart.length; i++){
      if (
        this.props.singleSuit.id === this.props.cart[i].id &&
        orderItem.fit === this.props.cart[i].fit &&
        orderItem.size === this.props.cart[i].size &&
        orderItem.length === this.props.cart[i].length
        ) {
        //dispatch update cart thunk
        return this.props.updateSuitInCart(orderItem)
      }
    }

    this.props.addSuitToCart(orderItem);
  }

  render() {
    const { singleSuit } = this.props;

    return (
      <div className="single-item">

        <div>
          {!singleSuit ?
            (
              <h3>NO SUIT!</h3>
            ) : (
              <div>
                <h1>{singleSuit.name} {singleSuit.category} - {singleSuit.color}</h1>
                <h2>${singleSuit.price}</h2>
                <p>{singleSuit.description}</p>
                <img src={singleSuit.imageUrl} alt="Prince Philip" width="250" height="300" />
              </div>
            )}
        </div>

        <form id="size-form" onSubmit={this.handleSubmit}>

          <label htmlFor="fit">Fit:</label>
          <button type="button" name="fit" onClick={this.handleClick} value="slim">Slim</button>
          <button type="button" name="fit" onClick={this.handleClick} value="classic">Classic</button>

          <br />
          <br />

          <label htmlFor="size">Size:</label>
          <button type="button" name="size" onClick={this.handleClick} value="36">36</button>
          <button type="button" name="size" onClick={this.handleClick} value="38">38</button>
          <button type="button" name="size" onClick={this.handleClick} value="40">40</button>
          <button type="button" name="size" onClick={this.handleClick} value="42">42</button>
          <button type="button" name="size" onClick={this.handleClick} value="44">44</button>
          <button type="button" name="size" onClick={this.handleClick} value="46">46</button>
          <button type="button" name="size" onClick={this.handleClick} value="48">48</button>
          <button type="button" name="size" onClick={this.handleClick} value="50">50</button>

          <br />
          <br />

          <label htmlFor="length">Length:</label>
          <button type="button" name="length" onClick={this.handleClick} value="short">Short</button>
          <button type="button" name="length" onClick={this.handleClick} value="regular">Regular</button>
          <button type="button" name="length" onClick={this.handleClick} value="long">Long</button>

          <br />
          <br />

          <button type="submit" className="add-to-cart">Add to Cart</button>
        </form>

      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  singleSuit: state.suits.singleSuit,
  cart: state.cart
});

const mapDispatchToProps = (dispatch, { history }) => ({
  loadSingleSuit: (suitId) => dispatch(fetchSingleSuit(suitId)),
  addSuitToCart: (orderItem) => dispatch(addProductToCart(orderItem)),
  updateSuitInCart: (orderItem) => dispatch(updateProductInCart(orderItem))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleSuit);
