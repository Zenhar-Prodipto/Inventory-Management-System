exports.userSignUpVaidator = (req, res, next) => {
  req.check("name", "name is required").notEmpty();

  req
    .check("email", "must be within 3 to 40 characters")
    .notEmpty()
    // .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    .matches(/.+\@.+\..+/)
    .withMessage("Emails must be valid")
    .isLength({
      min: 3,
      max: 32,
    });

  req.check("password", "Password is required").notEmpty();

  req
    .check("password")
    .isLength({
      min: 6,
    })
    .matches(/\d/)
    .withMessage(
      "Password much be alphanumeric and at least 6 characters long"
    );

  const errors = req.validationErrors();
  if (errors) {
    const firsterror = errors.map((error) => error.msg)[0];

    return res.status(400).json({ error: firsterror });
  }

  next();
};
