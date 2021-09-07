const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const WarehouseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 70,
    },
    address: [
      {
        city: {
          type: String,
          trim: true,
          max_length: 500,
        },

        street: {
          type: String,
          trim: true,
          max_length: 500,
        },

        postalCode: {
          type: String,
          trim: true,
          max_length: 500,
        },
      },
    ],

    area: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },

    contact: {
      type: String,
      trim: true,
      required: true,
      default: "09090909",
      match: [
        /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
        "Please fill a valid phone Number",
      ],
    },

    productList: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Warehouse", WarehouseSchema);
