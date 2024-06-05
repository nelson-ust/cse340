// middlewares/validateRegistration.js

const { body, validationResult } = require('express-validator');

// Validation rules for login data
const loginRules = () => {
  return [
    body('account_email')
      .isEmail()
      .withMessage('Please enter a valid email address'),
    body('account_password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ];
};

// Validation rules for registration data (if needed) .   const registrationRules = () => {
const registrationRules = () => {
/*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */
  return [
    // firstname is required and must be string
    body("account_firstname")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a first name."), // on error this message is sent.

    // lastname is required and must be string
    body("account_lastname")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please provide a last name."), // on error this message is sent.

    // valid email is required and cannot already exist in the DB
    body("account_email")
    .trim()
    .escape()
    .notEmpty()
    .isEmail()
    .normalizeEmail() // refer to validator.js docs
    .withMessage("A valid email is required."),

    // password is required and must be strong password
    body("account_password")
      .trim()
      .notEmpty()
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Password does not meet requirements."),
  ]
}

// Middleware to check login data
const checkLoginData = (req, res, next) => {
  const errors = validationResult(req);
  console.log(JSON.stringify(req.body));
  if (!errors.isEmpty()) {
    const nav = []; // Or fetch the nav as needed
    return res.status(400).render('account/login', {
      title: 'Login',
      nav,
      errors: errors.array(),
      account_email: req.body.account_email
    });
  }
  next();
};

// Middleware to check registration data (if needed)
const checkRegistrationData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const nav = []; // Or fetch the nav as needed
    return res.status(400).render('account/register', {
      title: 'Register',
      nav,
      errors: errors.array(),
      account_email: req.body.account_email
    });
  }
  next();
};

module.exports = {
  loginRules,
  registrationRules,
  checkLoginData,
  checkRegistrationData
};
