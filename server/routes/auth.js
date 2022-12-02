import express from "express";
import { signup, Login } from "../controllers/Auth.js";
import {
  userValidationRules,
  LoginValidationRules,
  validate,
} from "../validator/Validator.js";
const router = express.Router();

router.post("/signup", userValidationRules(), validate, signup);
router.post("/login", LoginValidationRules(), validate, Login);

export default router;
