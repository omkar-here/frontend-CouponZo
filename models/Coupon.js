  const mongoose = require("mongoose");

const Couponschema = new mongoose.Schema({
  couponType: {
    type: String,
    enum: ["static", "dynamic"],
  },
  orderName:{
    type: String,
    required: false
  },
  code: {
    type: String,
    required: [true, "A coupon should have code"],
  },
  redemptionLimit: {
    type: Number,
    required: [true, "A redeem limit is required for a coupon"],
  },
  applicableTo: {
    type: String,
    required: [true, "cart or sku product should be mentioned"],
  },
  discountType: {
    type: String,
    enum: ["percentage", "amount"],
    required: [true, "a type should be mentioned perecentage or amount"],
  },
  discountValue: {
    type: Number,
    required: [true, "A number for percent or amount is required"],
  },
  maxDiscountAmount: {
    type: Number,
    required: [false, "A max discount amount should be mentioned"],
  },
  conditions: {
    type: String,
    enum: ["none", "minCartValue", "minCartQuantity"],
    default: "none",
    required: [true, "A condition should be mentioned"],
  },
  conditionsValue: {
    type: Number,
  },
  productId: {
    type: String,
  },
  generatedAt: {
    type: Date,
    default: Date.now(),
  },
  orderId: {
    type: mongoose.Schema.ObjectId,
    ref: "Order",
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  expiry: {
    type: Date,
    required: [true, "A expiry date should be mentioned"],
  },
});

const Coupon = mongoose.model("Coupon", Couponschema);
module.exports = Coupon;
