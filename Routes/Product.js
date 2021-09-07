const express = require("express");
const router = express.Router();

//Imports from Authorization Controller
const {
  requireSignin,
  isAdmin,
  userById,
  readUsers,
} = require("../Controllers/Authorization");

//Imports from this.controller
const {
  productList,
  createProduct,
  readProduct,
  updateProduct,
  removeProduct,
  productById,
} = require("../Controllers/Product");

router.get("/products", productList);
router.post("/product/create/:userId", requireSignin, isAdmin, createProduct);
router.get("/product/:productId", readProduct);

router.put(
  "/product/update/:productId/:userId",
  requireSignin,
  isAdmin,
  updateProduct
);

router.delete(
  "/product/remove/:productId/:userId",
  requireSignin,
  isAdmin,
  removeProduct
);

router.param("userId", userById);
router.param("productId", productById);

// router.post("/product/create/:userId", requireSignin, isAdmin, create);
// router.get("/product/:productId", read);
// router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
// router.delete("/product/:productId/:userId", requireSignin, isAdmin, remove);
// router.put("/product/:productId/:userId", requireSignin, isAdmin, update);

// router.get("/products", list);
// router.get("/products/search", listSearch);
// router.get("/products/categories", categoryList);
// // router.get("/products/categories", categoryList2);

// router.get("/products/relatedproducts/:productId", relatedProducts);
// router.get("/products/catogories", categoryList);
// router.post("/products/by/search", listBySearch);
// router.get("/product/photo/:productId", productPhoto);

module.exports = router;
