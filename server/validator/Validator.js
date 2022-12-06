import { body, validationResult } from "express-validator";

export const userValidationRules = () => {
  return [
    body("firstname")
      .not()
      .isEmpty()
      .trim()
      .withMessage("firstname is required"),
    body("lastname").not().isEmpty().trim().withMessage("lastname is required"),
    body("email")
      .not()
      .isEmpty()
      .isEmail()
      .trim()
      .withMessage("email is required"),
    body("password").not().isEmpty().isLength({ min: 5 }).trim(),
  ];
};
export const LoginValidationRules = () => {
  return [
    body("email")
      .not()
      .isEmpty()
      .isEmail()
      .trim()
      .withMessage("email is required"),
    body("password").not().isEmpty().isLength({ min: 5 }).trim(),
  ];
};
export const AccoutValidationRules = () => {
  return [
    body("address").not().isEmpty().trim().withMessage("address is required"),
    body("phone")
      .not()
      .isEmpty()
      .isNumeric()
      .isLength({ max: 11, min: 10 })
      .trim()
      .withMessage(
        "phone number should not be more than 11 degit or less than 10 digit"
      ),
    body("openingbalance").not().isEmpty().trim(),
    body("type").not().isEmpty().trim().withMessage("type is required"),
  ];
};

export const DebitValidationRules = () => {
  return [
    body("amount")
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage("only numeric values allowed")
      .trim()
      .withMessage("amount is required"),
  ];
};
export const creditValidationRules = () => {
  return [
    body("amount")
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage("only numeric values allowed")
      .trim()
      .withMessage("amount is required"),
  ];
};

export const validate = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
      errors: extractedErrors,
    });
  } catch (error) {
    if (error) {
      res.status(500).json({
        message: error,
      });
    }
  }
};
