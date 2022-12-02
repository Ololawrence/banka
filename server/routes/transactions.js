import express from "express";
import TransactionController from "../controllers/Transactions.js";
import checkAuthToken from "../helpers/checkAuthTooken.js";
const {
  debit,
  deposit,
  getAllUserTransactions,
  getCreditTrans,
  getDebitTrans,
} = TransactionController;
import {DebitValidationRules, creditValidationRules, validate} from '../validator/Validator.js'
const router = express.Router();

router.post("/debit/:accountnumber", checkAuthToken,DebitValidationRules(), validate, debit);
router.post("/credit/:accountnumber", checkAuthToken, creditValidationRules(), validate, deposit);
router.get(
  "/transactions/:accountnumber",
  checkAuthToken,
  getAllUserTransactions
);
router.get("/credit/:accountnumber", checkAuthToken, getCreditTrans);
router.get("/debit/:accountnumber", checkAuthToken, getDebitTrans);

export default router;
