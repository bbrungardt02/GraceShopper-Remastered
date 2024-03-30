const router = require("express").Router();

// GET /api/health
router.get("/health", (req, res, next) => {
  res.send({
    message: "Api is up and healthy!",
  });
});

const usersRouter = require("./users");
router.use("/users", usersRouter);
const cart_itemsRouter = require("./cartItems.js");
router.use("/cart_items", cart_itemsRouter);
const inventoriesRouter = require("./inventory");
router.use("/inventories", inventoriesRouter);
const productsRouter = require("./products");
router.use("/products", productsRouter);
const shoppingCartsRouter = require("./shoppingcart");
router.use("/shoppingcart", shoppingCartsRouter);

module.exports = router;
