const jwt = require("jsonwebtoken");
const User= require("../models/User");
const verify = (req, res) => {
  try {
    // console.log(req.cookies)
    const token = req.cookies.jwt;

    //check json web token exists & is verified
    if (token) {
      jwt.verify(token, "couponzo secret key",async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          console.log("error");
          res.status(401).json({ message: "No cookies" });
        } else {
          console.log(decodedToken);
          const user= await User.findById(decodedToken.id);  
          decodedToken
            ? res.json(user)
            : res.json({ message: "No cookies" });
        }
      });
    } else {
      res.status(401);
      res.json({ message: "No cookies" });
      console.log("error");
    }
  } catch (err) {
    console.log(err);
    console.log("error");
  }
};
module.exports = { verify };
