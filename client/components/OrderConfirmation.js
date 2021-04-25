import React from 'react'
import {connect} from 'react-redux'

const OrderConfirmation = (props) => {
  return (
    <div>
      <h1>
        Order Confirmation #ORDER_ID
      </h1>
      <h2>
        Thank you for shopping at Phillip's Suits!
      </h2>
      <p>QUANTITY, INDIVIDUAL_PRICE, PRODUCT_NAME, SIZE, FIT, LENGTH</p>
      <p>Order Total: $ORDER_TOTAL_PRICE</p>
    </div>
  )
}

const mapStateToProps = (state) => ({
  cart: state.cart //need to verify what it's called in store
})

export default connect(mapStateToProps, null)(OrderConfirmation)
