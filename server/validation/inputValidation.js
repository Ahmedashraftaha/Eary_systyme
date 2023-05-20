const { body, validationResult } = require('express-validator');

const registerValidationRules = [
  body('name').notEmpty().isLength({min:3}),
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
];

const loginValidationRules = [
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
];

function validateRegister(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json({ errors: errors.array() });
}

function validateLogin(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json({ errors: errors.array() });
}

module.exports = {
  registerValidationRules,
  loginValidationRules,
  validateRegister,
  validateLogin,
};