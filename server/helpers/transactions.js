import Account from "../Models/Account.js";

export const debitFund = async (accountNumber, amount) => {
  const account = await Account.findOne({ accountNumber });

  const balance = Number(
    (parseFloat(account.accountbalance) - parseFloat(amount)).toFixed(2)
  );
  return balance;
};

export const creditFund = async (accountNumber, amount) => {
  const account = await Account.findOne({ accountNumber });

  const balance = Number(
    (parseFloat(account.accountbalance) + parseFloat(amount)).toFixed(2)
  );
  return balance;
};
