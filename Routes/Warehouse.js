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
  warehouseList,
  createWarehouse,
  readWarehouse,
  updateWarehouse,
  removeWarehouse,
  warehouseById,
} = require("../Controllers/Warehouse");

router.get("/warehouses", warehouseList);
router.post(
  "/warehouse/create/:userId",
  requireSignin,
  isAdmin,
  createWarehouse
);
router.get("/warehouse/:warehouseId", readWarehouse);

router.put(
  "/warehouse/update/:warehouseId/:userId",
  requireSignin,
  isAdmin,
  updateWarehouse
);

router.delete(
  "/warehouse/remove/:warehouseId/:userId",
  requireSignin,
  isAdmin,
  removeWarehouse
);

router.param("userId", userById);
router.param("warehouseId", warehouseById);

module.exports = router;
