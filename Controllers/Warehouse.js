const Warehouse = require("../Models/Warehouse");

exports.warehouseById = (req, res, next, id) => {
  Warehouse.findById(id).exec((err, warehouse) => {
    if (err || !warehouse) {
      return res.status(400).json({
        error: "Warehouse not found",
      });
    }
    req.warehouse = warehouse;
    next();
  });
};

exports.warehouseList = (req, res) => {
  Warehouse.find({}).exec((err, list) => {
    if (err) {
      return res.status(400).json({
        err: err,
      });
    }
    return res.status(200).json({
      list,
    });
  });
};

exports.createWarehouse = (req, res) => {
  const { name, address, area, contact, productList } = req.body;

  if (!name || !address || !area || !contact || !productList) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  let warehouse = new Warehouse(req.body);

  warehouse.save((err, result) => {
    if (err) {
      return res.status(400).json({
        Error: err,
        ErrorMessage: "Error Creating The Warehouse",
      });
    }
    return res.status(200).json({
      result,
    });
  });
};

exports.readWarehouse = (req, res) => {
  return res.json(req.warehouse);
};

exports.updateWarehouse = (req, res) => {
  let warehouse = req.warehouse;
  warehouse.name = req.body.name;
  warehouse.address = req.body.address;
  warehouse.area = req.body.area;
  warehouse.productList = req.body.productList;
  warehouse.contact = req.body.contact;

  warehouse.save((err, updatedData) => {
    if (err) {
      return res.status(400).json({
        "error Message": "Error Updating Warehouse",
        err: err,
      });
    }
    return res.status(200).json({
      message: "Successfully updated the warehouse",
      updatedData,
    });
  });
};

exports.removeWarehouse = (req, res) => {
  let warehouse = req.warehouse;
  warehouse.remove((err, removedData) => {
    if (err) {
      return res.status(400).json({
        error: "failed to remove the warehouse",
      });
    }

    res.json({
      removedData,
      massage: "Successfully removed the warehouse",
    });
  });
};
