const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const catchAsync = require("./../utils/catchAsync");
const uuid = require("uuid-random"); // npm package for generating UUIDs
const Order = require("./../models/Order");
const Coupon = require("./../models/Coupon");
const User = require("./../models/User");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

exports.user_info;

// Endpoint for generating coupon codes
exports.coupon_gen = catchAsync(async (req, res) => {
  console.log("request made");
  const {
    userId,
    type,
    numCodes,
    length,
    redemptionLimit,
    format,
    customPrefix,
    productId,
    applicableTo,
    discountType,
    discountValue,
    maxDiscountAmount,
    conditions,
    conditionsValue,
    name,
    expiry,
  } = req.body;
  const user = await User.findById(userId);

  const order = await Order.create({
    type,
    format,
    customPrefix,
    type,
    applicableTo,
    discountType,
    discountValue,
    maxDiscountAmount,
    length,
    conditions,
    conditionsValue,
    name,
    expiry,
  });

  user.orders.push(order._id);
  if (type === "static") {
    user.totalCouponsGenerated += Number(redemptionLimit);
  } else if (type === "dynamic") {
    user.totalCouponsGenerated += Number(numCodes);
  }

  await user.save();

  let couponList = [];

  if (type == "dynamic") {
    for (let i = 0; i < numCodes; i++) {
      let couponCode;

      if (format === "alphanumeric") {
        couponCode = customPrefix
          ? customPrefix +
            "-" +
            uuid().substring(0, length - customPrefix.length)
          : uuid().substring(0, length); // Add custom prefix if specified and limit the length of the UUID
      } else if (format === "numeric") {
        let code = Math.floor(Math.random() * Math.pow(10, length)).toString();
        couponCode = customPrefix
          ? customPrefix +
            "-" +
            code.padStart(length - customPrefix.length, "0")
          : code.padStart(length, "0"); // Add custom prefix if specified and pad the code with zeros to reach the specified length
      } else if (format === "alphabetic") {
        couponCode = customPrefix
          ? customPrefix +
            "-" +
            generateRandomAlphabetic(length - customPrefix.length)
          : generateRandomAlphabetic(length);
      }

      couponList.push({
        couponType: type,
        productId,
        code: couponCode,
        orderId: order._id,
        redemptionLimit: 1,
        userId: user._id,
        applicableTo,
        discountType,
        discountValue,
        maxDiscountAmount,
        conditions,
        conditionsValue,
        expiry,
      });
    }

    const coupon = await Coupon.insertMany(couponList);

    // coupon.map((c) => console.log(typeof c._id));

    order.couponList = coupon.map((c) => c._id);
    await order.save();
  }

  // STATIC starts here -----------------------------
  else if (type === "static") {
    let couponCode;

    if (format === "alphanumeric") {
      couponCode = customPrefix
        ? customPrefix + "-" + uuid().substring(0, length - customPrefix.length)
        : uuid().substring(0, length); // Add custom prefix if specified and limit the length of the UUID
    } else if (format === "numeric") {
      let code = Math.floor(Math.random() * Math.pow(10, length)).toString();
      couponCode = customPrefix
        ? customPrefix + "-" + code.padStart(length - customPrefix.length, "0")
        : code.padStart(length, "0"); // Add custom prefix if specified and pad the code with zeros to reach the specified length
    } else if (format === "alphabetic") {
      couponCode = customPrefix
        ? customPrefix +
          "-" +
          generateRandomAlphabetic(length - customPrefix.length)
        : generateRandomAlphabetic(length);
    }
    couponList.push({
      couponType: type,
      code: couponCode,
      orderId: order._id,
      redemptionLimit,
      productId,
      userId: user._id,
      applicableTo,
      discountType,
      discountValue,
      maxDiscountAmount,
      conditions,
      conditionsValue,
      expiry,
    });
    const coupon = await Coupon.create(couponList[0]);

    order.couponList.push([coupon._id]);
    await order.save();
  }
  res.status(200).json({
    status: "success",
    data: {
      couponList,
      order,
    },
  });
});

// Endpoint for listing coupon codes
exports.coupon_list = catchAsync(async (req, res) => {
  const couponList = await Coupon.find({ user: req.params._id });
  res.status(200).json({
    status: "success",
    data: {
      couponList,
    },
  });
});

function generateRandomAlphabetic(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
