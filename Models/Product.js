const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 70,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    sellingPrice: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },

    sourcingPrice: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },

    inventory: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
