import User from "../Models/signup.js";
import _ from "lodash";
import dotenv from "dotenv";
import Account from "../Models/Account.js";

dotenv.config();

class AccountController {
  /**
   *
   * @description Create Bank Account
   * @static
   * @param {object} req
   * @param {object} res
   * @param {*} next
   * @returns User's account number, firstname, lastname, email.....
   * @memberof AccountController
   */

  static async createAccount(req, res, next) {
    const Id = req.user._id;
    const { address, type } = req.body;
    const phone = Number(req.body.phone);
    const openingbalance = Number(req.body.openingbalance);
    const user = await User.findById(Id);

    let accountExist = await Account.findOne({ accountnumber: phone });
    const { firstname, lastname, email } = user;
    if (accountExist?.accountnumber == phone) {
      return res.status(400).json({
        message: "phone number is in use by anther user",
      });
    }

    let accountbalance = openingbalance;

    const acct = new Account({
      userId: Id,
      address,
      accountnumber: phone,
      openingbalance,
      type,
      accountbalance,
    });

    let newAcct = await acct.save();
    return res.status(201).json({
      message: "account created successfully",
      data: {
        firstname,
        lastname,
        email,
        newAcct,
      },
    });
  }

  static async getUserAccount(req, res) {
    let userId = req.user._id;
    const account = await Account.findOne({userId});
    if (!account) {
      return res.status(400).json({
        message: "user account not found",
      });
    }

    return res.status(200).json({
      message: "user account retrieved successfully",
      data: account,
    });
  }
}

export default AccountController;
