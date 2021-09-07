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

module.exports = router;
