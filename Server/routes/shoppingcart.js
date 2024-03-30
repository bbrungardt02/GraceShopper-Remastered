const shoppingCartsRouter = require("express").Router();
const {
  getShoppingCartByUserId,
  updateShoppingCart,
  createShoppingCarts,
  deleteShoppingCart,
  updateShoppingStatus,
  getAllOrdersByUserId,
  // getShoppingCartById,
} = require("../db/adapters/shoppingcart");
const { authRequired } = require("./utils");

shoppingCartsRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const { status, user_id } = req.body;
    const newCart = await createShoppingCarts({ status, user_id });
    res.send(newCart);
  } catch (error) {
    next(error);
  }
});

shoppingCartsRouter.get("/user/cart", authRequired, async (req, res, next) => {
  try {
    const shoppingCart = await getShoppingCartByUserId(req.user.user_id);
    res.send(shoppingCart);
    console.log("shoppingCart:", shoppingCart);
  } catch (error) {
    next(error);
  }
});

shoppingCartsRouter.get(
  "/user/order-history",
  authRequired,
  async (req, res, next) => {
    try {
      const orders = await getAllOrdersByUserId(req.user.user_id);
      res.send(orders);
    } catch (error) {
      next(error);
    }
  }
);

shoppingCartsRouter.patch(
  "/completed",
  authRequired,
  async (req, res, next) => {
    try {
      const completedCart = await updateShoppingStatus(req.user.user_id);
      res.send(completedCart);
    } catch (error) {
      next(error);
    }
  }
);

shoppingCartsRouter.patch("/:id", authRequired, async (req, res, next) => {
  try {
    const getcart = await getShoppingCartByUserId(+req.params.id);
    if (req.user.id == getcart.customer) {
      const updatecart = await updateShoppingCart(+req.params.id, req.body);
      res.send(updatecart);
    } else {
      //shouldnt hit this....
      res.status(401);
      next({ message: "this isnt your cart" });
    }
  } catch (error) {
    next(error);
  }
});

shoppingCartsRouter.delete("/cancel", authRequired, async (req, res, next) => {
  try {
    console.log("ping");
    const user_id = req.user.user_id;
    const deletedCart = await deleteShoppingCart(user_id);
    const { success, message } = deletedCart;
    console.log(success, message);
    res.send({ success, message });
  } catch (error) {
    next(error);
  }
});

module.exports = shoppingCartsRouter;
