const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // For Authorization Check
const User = require("../models/Users");

exports.signup = (req, res) => {
  //Validation
  let email = req.body.email;
  User.findOne({ email }).exec((found) => {
    if (found) {
      return res.status(409).json({
        message: "A user with such email already exists",
      });
    } else {
      console.log("Unique Email. Please proceed");
    }
  });

  //Instance of the model
  const user = new User(req.body);

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

exports.signin = (req, res) => {
  //Finding the user based on Email
  const { email, password } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "email doesn't exist",
      });
    }

    //if user is found, check email and password
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "email or password didn't match",
      });
    }

    //generate a signed token in user id

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    //cookies with expiry date. t is token here.
    res.cookie("t", token, { expire: new Date() + 9999 });

    const { _id, name, email, role } = user;

    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Successfully signed out" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAdmin = (req, res, next) => {
  //deny access if the user is a customer
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resource! Access Denied!",
    });
  }
  next();
};

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User Not Found",
      });
    }

    req.profile = user;
    next();
  });
};

exports.readUsers = (req, res) => {
  req.profile.hashed_password = undefined; //this will not be sent
  req.profile.salt = undefined; // this will not be sent

  return res.json(req.profile);
};
