const cart_itemsRouter = require("express").Router();
const {
  createCart_Item,
  getCartById,
  updateCartItem,
  deleteCartItem,
  getItemsFromCartId,
} = require("../db/adapters/cart_items");
const { authRequired } = require("./utils");

cart_itemsRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const { shoppingcart_id, product_id, count } = req.body;
    const newCart_Item = await createCart_Item(
      shoppingcart_id,
      product_id,
      count
    );
    console.log("newCart_Item:", newCart_Item);
    res.send(newCart_Item);
  } catch (error) {
    next(error);
  }
});

cart_itemsRouter.get("/items/:id", async (req, res, next) => {
  try {
    const items = await getItemsFromCartId(req.params.id);
    res.send(items);
  } catch (error) {
    next(error);
  }
});

cart_itemsRouter.get("/:id", async (req, res, next) => {
  try {
    const SingleCart = await getCartById(req.params.id);
    console.log("Get cart by id", SingleCart);
    res.send(SingleCart);
  } catch (error) {
    next(error);
  }
});

cart_itemsRouter.patch("/:item_id", async (req, res, next) => {
  try {
    const { item_id } = req.params;
    const { count } = req.body;
    const updatedCartItem = await updateCartItem({ item_id, count });
    res.send(updatedCartItem);
  } catch (error) {
    next(error);
  }
});

cart_itemsRouter.delete("/:item_id", authRequired, async (req, res, next) => {
  try {
    const { item_id } = req.params;
    const deletedCartItem = await deleteCartItem(item_id);
    res.send({ message: "Deleted cartItem!" });
  } catch (error) {
    next(error);
  }
});

module.exports = cart_itemsRouter;
