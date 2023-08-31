const express = require("express");
const router = express.Router();
const users = require("../controllers/authController");
const verifyUser = require("../middleware/authMiddleWare");
router.route("/register").post(users.register);
router.route("/login").post(users.login);
router.route("/logout").post(users.logout);
router.route("/test").get(users.test);
router.route("/clear").delete(users.clear);
router.route("/verify").get(verifyUser.verify);
// router.route("/verify").post(verifyUser.verify);
// router.route("/updateProfile").patch(verifyUser.verify,users.updateProfile);

// router.route("/set-cookies").get(users.setCookies);
// router.route("/read-cookies").get(users.readCookies);

module.exports = router;
