'use strict';

const {
  db,
  models: { User, Product, Order, OrderDetails },
} = require('../server/db');

const products = [
  {
    name: 'Phillip',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Grey',
    fit: 'Classic',
    price: 700,
    size: '43',
    description: 'An iconic suit.',
  },
  {
    name: 'Phillip',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Navy Blue',
    fit: 'Classic',
    price: 700,
    size: '41',
    description: 'An iconic suit.',
  },
  {
    name: 'George',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Royal Blue',
    fit: 'Slim',
    price: 650,
    size: '40',
    description: 'A new fit on an iconic suit.',
  },
  {
    name: 'Harry',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Black',
    fit: 'Slim',
    price: 650,
    size: '42',
    description: 'The ultimate party suit.',
  },
  {
    name: 'James',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Khaki',
    fit: 'Classic',
    price: 600,
    size: '44',
    description: 'A suit for the summer.',
  },
  {
    name: 'Henry',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Charcoal',
    fit: 'Classic',
    price: 600,
    size: '45',
    description: 'Go for smokey and smoldering.',
  },
  {
    name: 'Charles',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Olive',
    fit: 'Classic',
    price: 600,
    size: '40',
    description: 'Money on your mind? Dress like it.',
  },
];

const orderDetails = [
  {
    quantity: 1,
    price: 700,
    orderId: 1,
    productId: 1,
  },
  {
    quantity: 1,
    price: 650,
    orderId: 1,
    productId: 4,
  },
  {
    quantity: 3,
    price: 1800,
    orderId: 2,
    productId: 5,
  },
  {
    quantity: 1,
    price: 700,
    orderId: 1,
    productId: 2,
  },
];

const orders = [
  {
    order_status: 'pending',
    total_price: 2050,
    userId: 1,
  },
  {
    order_status: 'pending',
    total_price: 1800,
    userId: 2,
  },
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: 'cody',
      password: '123',
      email: 'codytheyak@aol.com',
      admin: true,
    }),
    User.create({
      username: 'murphy',
      password: '123',
      email: 'murphyslaw@aol.com',
    }),
  ]);

  // Creating Products
  await Promise.all(
    products.map((product) => {
      return Product.create(product);
    })
  );

  // Creating Orders
  await Promise.all(
    orders.map((order) => {
      return Order.create(order);
    })
  );

  // Creating OrdersDetails
  await Promise.all(
    orderDetails.map((orderDetail) => {
      return OrderDetails.create(orderDetail);
    })
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} users`);
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
