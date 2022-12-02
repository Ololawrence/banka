import express from "express";
import AccountController from "../controllers/account.js";
import checkAuthToken from "../helpers/checkAuthTooken.js";
import { AccoutValidationRules, validate} from "../validator/Validator.js";
const { createAccount } = AccountController;

const router = express.Router();

router.post("/account", checkAuthToken, AccoutValidationRules(), validate, createAccount);

export default router;
