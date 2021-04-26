import React from 'react'
import {connect} from 'react-redux'

//For testing render with dummy data
// const cart = {
//   id: 23,
//   total_price: 3200,
//   email: "juan@gmail.com",
//   address: "20 W 34th St, new York, NY 10001",
//   products: [
//     {
//       name: "Phillip",
//       color: "grey",
//       order_details: {
//         price: 700,
//         quantity: 2,
//         fit: "classic",
//         size: "42",
//         length: "short"
//       }
//     },
//     {
//       name: "George",
//       color: "Navy",
//       order_details: {
//         price: 600,
//         quantity: 1,
//         fit: "slim",
//         size: "40",
//         length: "long"
//       }
//     },
//     {
//       name: "Charles",
//       color: "Black",
//       order_details: {
//         price: 600,
//         quantity: 1,
//         fit: "slim",
//         size: "40",
//         length: "regular"
//       }
//     },
//     {
//       name: "Charles",
//       color: "Khaki",
//       order_details: {
//         price: 600,
//         quantity: 1,
//         fit: "slim",
//         size: "39",
//         length: "regular"
//       }
//     }
//   ]
// }

const OrderConfirmation = (props) => {
  const { cart } = props;
  return (
    <div>
      <h1>
        Order Confirmation #{cart.cart.id}
      </h1>
      <h2>
        Thank you for shopping at Phillip's Suits!
      </h2>
      <p>An email confirmation has been sent to:</p>
      <p>{cart.cart.email}</p>
      <p>Your order will arrive shortly at:</p>
      <p>{cart.cart.address}</p>
      <h2>
        Order Details
      </h2>
      <table>
        <tr>
          <th>Product Name</th>
          <th>Color</th>
          <th>Fit</th>
          <th>Size</th>
          <th>Length</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
        {cart.cart.products.map((product) => {
          return (
            <tr>
              <td>{product.name}</td>
              <td>{product.color}</td>
              <td>{product.order_details.fit}</td>
              <td>{product.order_details.size}</td>
              <td>{product.order_details.length}</td>
              <td>{product.order_details.price}</td>
              <td>{product.order_details.quantity}</td>
            </tr>
          );
        })}
      </table>
      <p><strong>Order Total: </strong>${cart.cart.total_price}</p>
    </div>
  )
}

const mapStateToProps = (state) => ({
  cart: state.cart
})

export default connect(mapStateToProps, null)(OrderConfirmation)
