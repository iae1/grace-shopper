'use strict';

const {
  db,
  models: { User, Product, Order, OrderDetails },
} = require('../server/db');

//Products array to seed
const products = [
  {
    name: 'The Phillip',
    category: 'Suit',
    imageUrl: 'https://images.theconversation.com/files/167917/original/file-20170504-21608-101tjet.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip',
    color: 'Grey',
    price: 700,
    description: 'An iconic suit.',
  },
  {
    name: 'The Phillip',
    category: 'Suit',
    imageUrl: 'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Navy Blue',
    price: 700,
    description: 'An iconic suit.',
  },
  {
    name: 'The George',
    category: 'Suit',
    imageUrl: 'https://static.onecms.io/wp-content/uploads/sites/20/2020/07/22/prince-philip-3-2000.jpg',
    color: 'Royal Blue',
    price: 650,
    description: 'A new fit on an iconic suit.',
  },
  {
    name: 'The Harry',
    category: 'Suit',
    imageUrl: 'https://images.vogue.it/gallery/41182/Big/7ad6f6cd-0218-4e09-a24e-caee0b1bef35.jpg',
    color: 'Black',
    price: 650,
    description: 'The ultimate party suit.',
  },
  {
    name: 'The James',
    category: 'Suit',
    imageUrl: 'http://1.bp.blogspot.com/-qyp6coHRQ1k/VpIMEbCwHFI/AAAAAAAAGa8/1Agkaj-Z3g0/s1600/prince_philip_best_dressed_tweed_pig_1.jpg',
    color: 'Khaki',
    price: 600,
    description: 'A suit for the summer.',
  },
  {
    name: 'The Henry',
    category: 'Suit',
    imageUrl: 'https://c8.alamy.com/comp/K7D7A9/photo-must-be-credited-kate-greenalpha-press-079965-20042016-prince-K7D7A9.jpg',
    color: 'Charcoal',
    price: 600,
    description: 'Go for smokey and smoldering.',
  },
  {
    name: 'The Charles',
    category: 'Suit',
    imageUrl: 'https://cdn.images.express.co.uk/img/dynamic/106/590x/Prince-Philip-and-the-Queen-1138436.jpg?r=1560243634147',
    color: 'Olive',
    price: 600,
    description: 'Money on your mind? Dress like it.',
  },
  {
    name: 'The John',
    category: 'Suit',
    imageUrl:
      'https://i.pinimg.com/originals/3d/71/f2/3d71f2981048115643a12bb2b1e3b211.jpg',
    color: 'Tan',
    price: 600,
    description: 'Money on your mind? Dress like it.',
  },
  {
    name: 'The Judas',
    category: 'Suit',
    imageUrl:
      'https://images.vogue.it/gallery/41182/Big/7ad6f6cd-0218-4e09-a24e-caee0b1bef35.jpg',
    color: 'Ink Black',
    price: 700,
    description: 'Money on your mind? Dress like it.',
  },
  {
    name: 'The Paul',
    category: 'Suit',
    imageUrl:
      'https://cdn.entertainmentdaily.com/2020/07/22132320/prince-philip-1-scaled.jpg',
    color: 'Brown',
    price: 600,
    description: 'Money on your mind? Dress like it.',
  },
  {
    name: 'The Juan',
    category: 'Suit',
    imageUrl: 'https://images.vogue.it/gallery/41182/Big/75e3a442-1095-4738-b6b8-a489016c1779.jpg',
    color: 'Grey',
    price: 700,
    description: 'Money on your mind? Dress like it.',
  },
  {
    name: 'The Morgan',
    category: 'Suit',
    imageUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-3428273-1617969984.jpg?crop=0.759xw:1.00xh;0.197xw,0&resize=640:*',
    color: 'Light Grey',
    price: 700,
    description: 'Money on your mind? Dress like it.',
  },
  {
    name: 'The Isaac',
    category: 'Suit',
    imageUrl: 'https://blog.samuel-windsor.co.uk/wp-content/uploads/2018/02/SWUK-prince-philip-the-crown.jpg',
    color: 'Blue',
    price: 700,
    description: 'Money on your mind? Dress like it.',
  },
  {
    name: 'The Nick',
    category: 'Suit',
    imageUrl: 'https://images.vogue.it/gallery/41182/Big/bfb4e655-4924-4ade-a4d1-d5d63d075fa7.jpg',
    color: 'Brown',
    price: 700,
    description: 'Money on your mind? Dress like it.',
  },
  {
    name: 'The Winston',
    category: 'Suit',
    imageUrl:
      'https://media.gq.com/photos/59a5f50671cf50240231b7e3/1:1/w_1939,h_1939,c_limit/barack-obama-tan-suit-3.jpg',
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
      'https://upload.wikimedia.org/wikipedia/commons/3/32/Lancering_Invictus_Games_2020-7_%28cropped%29.jpg',
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
