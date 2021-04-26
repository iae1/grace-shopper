'use strict';

const {
  db,
  models: { User, Product, Order, OrderDetails },
} = require('../server/db');

//Products array to seed
const products = [
  {
    name: 'Phillip',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Grey',
    price: 700,
    description: 'An iconic suit.',
  },
  {
    name: 'Phillip',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Navy Blue',
    price: 700,
    description: 'An iconic suit.',
  },
  {
    name: 'George',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Royal Blue',
    price: 650,
    description: 'A new fit on an iconic suit.',
  },
  {
    name: 'Harry',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Black',
    price: 650,
    description: 'The ultimate party suit.',
  },
  {
    name: 'James',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Khaki',
    price: 600,
    description: 'A suit for the summer.',
  },
  {
    name: 'Henry',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Charcoal',
    price: 600,
    description: 'Go for smokey and smoldering.',
  },
  {
    name: 'Charles',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Olive',
    price: 600,
    description: 'Money on your mind? Dress like it.',
  },
  {
    name: 'John',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Tan',
    price: 600,
    description: 'Money on your mind? Dress like it.',
  },
  {
    name: 'Judas',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Ink Black',
    price: 700,
    description: 'Money on your mind? Dress like it.',
  },
  {
    name: 'Paul',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Brown',
    price: 600,
    description: 'Money on your mind? Dress like it.',
  },
  {
    name: 'Juan',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Grey',
    price: 700,
    description: 'Money on your mind? Dress like it.',
  },
  {
    name: 'Morgan',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Emerald',
    price: 700,
    description: 'Money on your mind? Dress like it.',
  },
  {
    name: 'Isaac',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Blue',
    price: 700,
    description: 'Money on your mind? Dress like it.',
  },
  {
    name: 'Nick',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Black',
    price: 700,
    description: 'Money on your mind? Dress like it.',
  },
  {
    name: 'Winston',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Tan',
    price: 600,
    description: 'Money on your mind? Dress like it.',
  },
  {
    name: 'The Gentleman',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Tobacco',
    price: 600,
    description: 'Money on your mind? Dress like it.',
  },
  {
    name: 'The Lounger',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Charcoal',
    price: 600,
    description: 'Money on your mind? Dress like it.',
  },
  {
    name: 'The Loiterer',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Light Gray',
    price: 600,
    description: 'Money on your mind? Dress like it.',
  },
];

//Order details to seed
const orderDetails = [
  {
    quantity: 1,
    price: 700,
    orderId: 1,
    productId: 1,
    fit: 'classic',
    size: '42',
    length: 'short'
  },
  {
    quantity: 1,
    price: 650,
    orderId: 1,
    productId: 4,
    fit: 'slim',
    size: '40',
    length: 'short'
  },
  {
    quantity: 1,
    price: 700,
    orderId: 1,
    productId: 2,
    fit: 'slim',
    size: '38',
    length: 'regular'
  },
  {
    quantity: 3,
    price: 600,
    orderId: 2,
    productId: 5,
    fit: 'classic',
    size: '43',
    length: 'long'
  },
  {
    quantity: 2,
    price: 700,
    orderId: 3,
    productId: 11,
    fit: 'classic',
    size: '38',
    length: 'short'
  },
  {
    quantity: 1,
    price: 700,
    orderId: 3,
    productId: 12,
    fit: 'slim',
    size: '37',
    length: 'short'
  },
  {
    quantity: 1,
    price: 700,
    orderId: 3,
    productId: 13,
    fit: 'slim',
    size: '37',
    length: 'long'
  },
  {
    quantity: 2,
    price: 700,
    orderId: 4,
    productId: 12,
    fit: 'classic',
    size: '38',
    length: 'short'
  },
  {
    quantity: 2,
    price: 700,
    orderId: 5,
    productId: 13,
    fit: 'classic',
    size: '38',
    length: 'short'
  },
  {
    quantity: 2,
    price: 700,
    orderId: 6,
    productId: 14,
    fit: 'classic',
    size: '38',
    length: 'short'
  },
  {
    quantity: 2,
    price: 700,
    orderId: 7,
    productId: 11,
    fit: 'classic',
    size: '38',
    length: 'short'
  },
];

//Orders to seed
const orders = [
  {
    order_status: 'pending',
    total_price: 2050,
    userId: 1,
    email: 'codytheyak@aol.com'
  },
  {
    order_status: 'pending',
    total_price: 1800,
    userId: 2,
    email: 'murphyslaw@aol.com',
  },
  {
    order_status: 'pending',
    total_price: 2800,
    userId: 3,
    email: 'juan@gmail.com',
  },
  {
    order_status: 'pending',
    total_price: 1400,
    userId: 4,
    email: 'morgan@gmail.com',
  },
  {
    order_status: 'pending',
    total_price: 1400,
    userId: 5,
    email: 'isaac@gmail.com',
  },
  {
    order_status: 'pending',
    total_price: 1400,
    userId: 6,
    email: 'nick@gmail.com',
  },
  {
    order_status: 'completed',
    total_price: 1400,
    userId: 3,
    address: "juan's address",
    email: 'juan@gmail.com',
  },
];

//Users to seed
const users = [
  {
    username: 'cody',
    password: '123',
    email: 'codytheyak@aol.com',
    admin: true,
  },
  {
    username: 'murphy',
    password: '123',
    email: 'murphyslaw@aol.com',
  },
  {
    username: 'juan',
    password: '123',
    email: 'juan@gmail.com',
    admin: true,
  },
  {
    username: 'morgan',
    password: '123',
    email: 'morgan@gmail.com',
    admin: true,
  },
  {
    username: 'isaac',
    password: '123',
    email: 'isaac@gmail.com',
    admin: true,
  },
  {
    username: 'nick',
    password: '123',
    email: 'nick@gmail.com',
    admin: true,
  }
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating users in order (not very efficient, but this guarantees that they have expected ids)
  for (let user of users) {
    await User.create(user)
  };

  // Creating Products in order (not very efficient, but this guarantees that they have expected ids)
  for (let product of products) {
    await Product.create(product)
  };

  // Creating Orders in order (not very efficient, but this guarantees that they have expected ids)
  for (let order of orders) {
    await Order.create(order)
  };

  // Creating OrdersDetails in order (not very efficient, but this guarantees that they have expected ids)
  await Promise.all(
    orderDetails.map((orderDetail) => {
      return OrderDetails.create(orderDetail);
    })
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
