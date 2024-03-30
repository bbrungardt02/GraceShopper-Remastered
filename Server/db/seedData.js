// Create some seed data and export it from this file
const users = [
  {
    username: "Brandon",
    email: "Brandon@gmail.com",
    password: 12345678,
    adm: false,
  },
  {
    username: "Jeffrey",
    email: "Jeffrey@gmail.com",
    password: 12345678,
    adm: false,
  },
  {
    username: "Elliot",
    email: "Elliot@gmail.com",
    password: 12345678,
    adm: false,
  },
  {
    username: "Brian",
    email: "Brian@gmail.com",
    password: 12345678,
    adm: false,
  },
  {
    username: "admin",
    email: "admin@admin",
    password: "admin",
    adm: true,
  },
];

const products = [
  {
    product_name: "The Angus Burger",
    price: (3, 2),
    description: "100% Pure Angus Beef",
    category: "Sandwiches",
    inventory_id: 1,
  },
  {
    product_name: "The Chicken Burger",
    price: (3, 2),
    description: "100% Cage Free",
    category: "Sandwiches",
    inventory_id: 2,
  },
  {
    product_name: "The Pork Burger",
    price: (3, 2),
    description: "100% Pork",
    category: "Sandwiches",
    inventory_id: 3,
  },
  {
    product_name: "The Fish Burger",
    price: (3, 2),
    description: "Straight From the Antarctic",
    category: "Sandwiches",
    inventory_id: 4,
  },
  {
    product_name: "Coke Cola",
    price: (3, 2),
    description: "Better than Mc**** Sprite",
    category: "Beverages",
    inventory_id: 5,
  },
  {
    product_name: "Dr.Pepper",
    price: (3, 2),
    description: "23 Amazing Flavors",
    category: "Beverages",
    inventory_id: 6,
  },
  {
    product_name: "Mountain Dew",
    price: (1, 2),
    description: "Straight From Mt. Everest",
    category: "Beverages",
    inventory_id: 7,
  },
  {
    product_name: "Fries",
    price: (2, 2),
    description: "Freshly Ground Sea Salt",
    category: "Sides",
    inventory_id: 8,
  },
  {
    product_name: "Fruits Cups",
    price: (1, 2),
    description: "Straight From the Tree",
    category: "Sides",
    inventory_id: 9,
  },
  {
    product_name: "Ice Cream Cone",
    price: (1, 2),
    description: "Soft Serve Only",
    category: "Ice Cream",
    inventory_id: 10,
  },
  {
    product_name: "Sundaes",
    price: (1, 2),
    description: "Udderly Amazing",
    category: "Ice Cream",
    inventory_id: 11,
  },

  {
    product_name: "Grimace Shake",
    price: (1, 2),
    description: "We are NOT liable after consumption",
    category: "Deals",
    inventory_id: 12,
  },
  {
    product_name: "Grimace birthday meal",
    price: (1, 2),
    description: "Secret Grimace Ingredients",
    category: "Deals",
    inventory_id: 13,
  },
];

const inventories = [
  { quantity: 100 },
  { quantity: 100 },
  { quantity: 100 },
  { quantity: 100 },
  { quantity: 100 },
  { quantity: 100 },
  { quantity: 100 },
  { quantity: 100 },
  { quantity: 100 },
  { quantity: 100 },
  { quantity: 100 },
  { quantity: 100 },
  { quantity: 100 },
];
const cart_items = [
  { shoppingcart_id: 1, product_id: 1, count: 10 },
  { shoppingcart_id: 2, product_id: 2, count: 10 },
  { shoppingcart_id: 3, product_id: 3, count: 10 },
  { shoppingcart_id: 4, product_id: 4, count: 10 },
  { shoppingcart_id: 5, product_id: 5, count: 10 },
];

const shopping_carts = [
  { status: "completed", user_id: 1 },
  { status: "completed", user_id: 2 },
  { status: "completed", user_id: 3 },
  { status: "completed", user_id: 4 },
  { status: "completed", user_id: 5 },
];

// ]
module.exports = {
  users,
  inventories,
  cart_items,
  shopping_carts,
  products,
};
