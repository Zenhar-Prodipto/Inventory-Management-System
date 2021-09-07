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
  filterProducts,
  restockingInventory,
  stockedOut,
  productById,
  checkout,
} = require("../Controllers/Product");

const { warehouseById } = require("../Controllers/Warehouse");

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

router.get("/filter/by/area/", filterProducts);
router.get("/products/restocking", requireSignin, restockingInventory);
router.get("/products/stockedOut", requireSignin, stockedOut);
router.post("/products/checkout", requireSignin, checkout);

router.param("userId", userById);
router.param("productId", productById);
router.param("warehouseId", warehouseById);

module.exports = router;
