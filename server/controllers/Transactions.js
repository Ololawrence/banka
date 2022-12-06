import Account from "../models/account.js";
import User from "../models/signup.js";
import { debitFund, creditFund } from "../helpers/transactions.js";
import Credit from "../Models/credit.js";
import Debit from "../Models/debit.js";
import Transactions from "../models/transactions.js";

class TransactionController {
  /**
   *
   * @description Debiit bank account
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns Transaction Id, account number, credit amount, user Id, transaction type and account balance
   * @memberof TransactionsController
   */

  static async debit(req, res, next) {
    let userId = req.user._id;
    const accountnumber = req.params.accountnumber;
    let user = await User.findById(userId);
    const amount = Number(req.body.amount);

    const account = await Account.findOne({ accountnumber });
    if (!account) {
      return res.status(404).json({
        message: "Account does not exist",
      });
    }
    if (typeof amount !== "number" || amount < 1) {
      return res.status(400).json({
        status: 400,
        error: "please enter valid number or amount greater zero",
      });
    }
    const oldBalance = account.accountbalance;

    if (amount > oldBalance) {
      return res.status(400).json({
        status: res.statusCode,
        error: "insufficient fund",
      });
    }

    const type = "debit";
    const newBalance = await debitFund(accountnumber, amount);

    const trans = new Debit({
      userId,
      type,
      accountnumber,
      currentbalance: newBalance,
      oldbalance: newBalance,
      amount,
    });

    const accountUpdate = await Account.findOneAndUpdate(
      accountnumber,
      { $set: { accountbalance: newBalance } },
      { new: true }
    );
    const transaction = new Transactions({
      userId,
      type,
      accountnumber,
      currentbalance: newBalance,
      oldbalance: newBalance,
      amount,
    });
    await transaction.save();
    await trans.save();

    return res.status(201).json({
      message: `your account ${accountnumber} was debited with #${amount}`,
      by: user?.firstname + " " + user?.lastname,
      trans,
      accountUpdate,
    });
  }
  static async deposit(req, res, next) {
    let userId = req.user._id;
    const accountnumber = req.params.accountnumber;
    let user = await User.findById(userId);
    const amount = Number(req.body.amount);

    const account = await Account.findOne({ accountnumber });
    if (!account) {
      return res.status(404).json({
        message: "Account does not exist",
      });
    }
    if (typeof amount !== "number" || amount < 1) {
      return res.status(400).json({
        status: 400,
        error: "please enter valid number or amount greater zero",
      });
    }
    const oldBalance = account.accountbalance;

    const type = "credit";
    const newBalance = await creditFund(accountnumber, amount);

    const trans = new Credit({
      userId,
      type,
      accountnumber,
      currentbalance: newBalance,
      oldbalance: newBalance,
      amount,
    });

    const accountUpdate = await Account.findOneAndUpdate(
      accountnumber,
      { $set: { accountbalance: newBalance } },
      { new: true }
    );
    const transaction = new Transactions({
      userId,
      type,
      accountnumber,
      currentbalance: newBalance,
      oldbalance: newBalance,
      amount,
    });
    await transaction.save();
    await trans.save();

    return res.status(200).json({
      message: `your account ${accountnumber} was credited with #${amount}`,
      by: user?.firstname + " " + user?.lastname,
      trans,
      accountUpdate,
    });
  }

  static async getAllUserTransactions(req, res) {
    // const accountnumber = req.params.accountnumber;
        const UserId = req.user._id;

    let Trans = await Transactions.find({ userId: UserId });
    if (!Trans) {
      return res.status(404).json({
        message: "No transaction with the given accountID",
      });
    }

    return res.status(200).json({
      message: "transaction retrieved ",
      data: Trans,
    });
  }

  static async getCreditTrans(req, res) {
    const accountnumber = req.params.accountnumber;
    let getCredit = await Credit.find({ accountnumber });
    res.status(200).json(getCredit);
  }

  static async getDebitTrans(req, res) {
    const accountnumber = req.params.accountnumber;
    let getCredit = await Debit.find({ accountnumber });
    res.status(200).json(getCredit);
  }
}

export default TransactionController;
