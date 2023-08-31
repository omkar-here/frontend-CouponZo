const Order = require("../models/Order");
const Coupon = require("../models/Coupon");
const User = require("../models/User");
const getCouponList = async (req, res) => {
  console.log(req.params);
  const { orderId } = req.query;

  try {
    const order = await Order.findById(orderId); // Assuming you want to get multiple orders
    const couponCodesList = order.couponList.map((coupon) => {
      return coupon;
    });
    // Use Promise.all to fetch coupons for all the coupon codes in parallel
    const couponList = await Promise.all(
      couponCodesList.map(async (couponCode) => {
        const coupon = await Coupon.findById(couponCode.toHexString());
        return coupon;
      })
    );

    // Assuming you want to send the coupon list as the response for Express route
    res.json(couponList);
  } catch (err) {
    console.error("Error while fetching coupons:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserCouponList = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.find({ _id: userId });
    const userCouponsCount = user[0].totalCouponsGenerated;
    res.json({ userCouponsCount: userCouponsCount });
  } catch (err) {
    console.error("Error while fetching coupons:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRedeemedCouponsCount = async (req, res) => {
  const userId = req.body.userId;
  console.log(userId);
  try {
    const user = await User.findById(userId);
    const totalCouponsUsed = user.totalCouponsUsed;
    console.log(totalCouponsUsed);
    res.json({ totalCouponsUsed: totalCouponsUsed }).status(200);
  } catch (err) {
    console.error("Error while fetching coupons:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getStaticDynamicCouponsCount = async (req, res) => {
  const userId = req.body.userId;
  let staticCount = 0;
  let dynamicCount = 0;

  try {
    const user = await User.findById(userId);
    for (const orderId of user.orders) {
      const order = await Order.findById(orderId);
      console.log(order);

      if (order.type === "static") {
        const coupon = await Coupon.findById(order.couponList[0]);
        staticCount += coupon.redemptionLimit;
        console.log(staticCount);
      } else {
        dynamicCount += order.couponList.length;
        console.log(dynamicCount);
      }
    }

    res.status(200).json({ staticCount, dynamicCount });
    console.log(res.json);
  } catch (err) {
    console.error("Error while fetching coupons:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getCouponList,
  getUserCouponList,
  getRedeemedCouponsCount,
  getStaticDynamicCouponsCount,
};
