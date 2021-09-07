const Product = require("../Models/Product");
const Warehouse = require("../Models/Warehouse");

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "Product not found",
      });
    }
    req.product = product;
    next();
  });
};

exports.productList = (req, res) => {
  Product.find({})
    .select("-sourcingPrice")
    .exec((err, list) => {
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

exports.createProduct = (req, res) => {
  const { name, description, sellingPrice } = req.body;

  if (!name || !description || !sellingPrice) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  let product = new Product(req.body);

  product.save((err, result) => {
    if (err) {
      return res.status(400).json({
        Error: err,
        ErrorMessage: "Error Creating The Product",
      });
    }
    return res.status(200).json({
      result,
    });
  });
};

exports.readProduct = (req, res) => {
  return res.json(req.product);
};

exports.updateProduct = (req, res) => {
  let product = req.product;
  product.name = req.body.name;
  product.description = req.body.description;
  product.sellingPrice = req.body.sellingPrice;
  product.inventory = req.body.inventory;

  product.save((err, updatedProduct) => {
    if (err) {
      return res.status(400).json({
        "error Message": "Error Updating Product",
        err: err,
      });
    }
    return res.status(200).json({
      message: "Successfully updated the product",
      updatedProduct,
    });
  });
};

exports.removeProduct = (req, res) => {
  let product = req.product;
  product.remove((err, removedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "failed to remove product",
      });
    }

    res.json({
      removedProduct,
      massage: "Successfully removed the product",
      id: req.product.id,
    });
  });
};

exports.filterProducts = (req, res) => {
  let area = req.query.area;

  const warehouse_areas = ["gulshan", "banani"];

  if (!warehouse_areas.includes(area.toLowerCase())) {
    return res.status(400).json({
      msg: "No such warehouse",
    });
  }
  console.log(req.query.area);
  Warehouse.find({ area: area })
    .select("name")
    .populate("productList.product")
    .exec((err, filteredProducts) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: err,
        });
      }
      res.json(filteredProducts);
    });
};

exports.restockingInventory = (req, res) => {
  Product.find({ inventory: { $lt: 5 } }).exec((err, list) => {
    if (err) {
      return res.status(400).json({
        err: err,
      });
    }

    return res.json({ list });
  });
};

exports.stockedOut = (req, res) => {
  Product.find({ inventory: { $eq: 0 } }).exec((err, list) => {
    if (err) {
      return res.status(400).json({
        err: err,
      });
    }

    return res.json({ list });
  });
};

exports.checkout = (req, res) => {
  let product_id = req.query.product_id;

  Product.findById({ _id: product_id }).exec((err, product) => {
    if (err) {
      return res.status(400).json({
        err: err,
      });
    }
    if (product.inventory === 0) {
      return res.status(400).json({
        msg: "Stocked Out",
      });
    }

    Product.findOneAndUpdate(
      { _id: product_id },
      { $inc: { inventory: -1 } }
    ).exec((err, product) => {
      if (err) {
        return res.status(400).json({
          err: err,
        });
      }
      return res.status(200).json({
        product,
      });
    });
  });
};
