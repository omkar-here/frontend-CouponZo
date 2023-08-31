const Order = require("../models/Order");
const User = require("../models/User");

exports.getOrderList = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    const result = await Promise.all(
      user.orders.map(async (element) => {
        const order = await Order.findById(element);
        return order;
      })
    );

    res.json({ result: result });
  } catch (err) {
    console.log(err);
  }
};

exports.getRecentOrderList = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    const result = await Promise.all(
      user.orders.map(async (element) => {
        const order = await Order.findById(element);
        return order;
      })
    );
    result.sort((a, b) => b.createdAt > a.created);
    result.reverse();
    const slicedResult = result.slice(0, 5);
    res.json({ result: slicedResult }).status(200);
  } catch (err) {
    console.log(err);
  }
};
