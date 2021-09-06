const express = require("express");
const router = express.Router();

const { signup, signin, signout } = require("../Controllers/Authorization");

const { userSignUpVaidator } = require("../Validators");

router.post("/signup", userSignUpVaidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
