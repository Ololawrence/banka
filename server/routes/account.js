import express from "express";
import AccountController from "../controllers/account.js";
import checkAuthToken from "../helpers/checkAuthTooken.js";
import { AccoutValidationRules, validate} from "../validator/Validator.js";
const { createAccount, getUserAccount } = AccountController;

const router = express.Router();

router.post("/account", 
checkAuthToken, 
AccoutValidationRules(), validate, createAccount);
router.get("/account", checkAuthToken, getUserAccount);

export default router;
