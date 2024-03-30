const productsRouter = require("express").Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../db/adapters/products");
const { authRequired, checkForAdmin } = require("./utils");

productsRouter.post(
  "/",
  authRequired && checkForAdmin,
  async (req, res, next) => {
    console.log("REQ BODY", req.body);
    try {
      const { product_name, price, description, inventory_id, category } =
        req.body;
      const newProduct = await createProduct(
        product_name,
        price,
        description,
        inventory_id,
        category
      );
      res.send(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.get("/", async (req, res, next) => {
  try {
    const AllProducts = await getAllProducts();
    res.send(AllProducts);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:id", async (req, res, next) => {
  try {
    console.log("ping");
    const SingleProduct = await getProductById(req.params.id);
    console.log("Get product by id", SingleProduct);
    res.send(SingleProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.patch(
  "/:update",
  authRequired && checkForAdmin,
  async (req, res, next) => {
    try {
      const { product_name, price, description, category } = req.body;
      const UpdatedProduct = await updateProduct(
        req.params.update,
        product_name,
        price,
        description,
        category
      );
      res.send(UpdatedProduct);
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.delete(
  "/:inventory_id",
  authRequired,
  async (req, res, next) => {
    try {
      console.log("ping");
      const inventory_id = req.params.inventory_id;
      const deletedProduct = await deleteProduct(inventory_id);
      const { success, message } = deletedProduct;
      console.log(success, message);
      res.send({ success, message });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = productsRouter;
