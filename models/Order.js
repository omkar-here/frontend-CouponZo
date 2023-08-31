const mongoose = require("mongoose");
const Coupon = require("./Coupon");
const OrderSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["static", "dynamic"],
    required: [true, "Type of the Order should be mentioned"],
  },
  format: {
    type: String,
    enum: ["alphanumeric", "alphabetic", "numeric"],
    required: [true, "Format of the Order should be mentioned"],
  },

  customPrefix: {
    type: String,
    required: [true, "Prefix should be mentioned"],
  },
  applicableTo: {
    type: String,
    enum: ["cart", "sku"],
    required: [true, "A cart or sku should be mentioned"],
  },

  discountType: {
    type: String,
    enum: ["percentage", "amount"],
    required: [true, "A discount-type should be mentioned"],
  },
  discountValue: {
    type: Number,
    required: [true, "A number for percent or amount is required"],
  },
  maxDiscountAmount: {
    type: Number,
    required: [true, "A max discount amount should be mentioned"],
  },
  length: {
    type: Number,
    required: [true, "length of coupon should be mentioned"],
  },
  conditions: {
    type: String,
    enum: ["none", "minCartValue", "minCartQuantity"],
    default: "none",
    required: [true, "A condition should be mentioned"],
  },
  conditionValue: {
    type: Number,
  },
  expiry: {
    type: Date,
    required: [true, "Expiry date should be mentioned"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  OrderId: {
    type: mongoose.Schema.ObjectId,
    ref: "Order",
  },
  couponList: {
    type: [mongoose.Types.ObjectId], // Assuming your coupon IDs are ObjectIds
    ref: Coupon,
  },
  couponsUsed: {
    type: Number, // Assuming your coupon IDs are ObjectIds
    default: 0,
  },
  name: {
    type: String,
    required: [true, "Name of the Order should be mentioned"],
  },
});

OrderSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Order", OrderSchema);
