import mongoose from 'mongoose';
import Signup from './models/Signup.js';
import Account from './Models/Account.js';
import dotEnv  from 'dotenv';
dotEnv.config();


const db = process.env.MONGOURL;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB successfully connected");
  })
  .catch((err) => {
    console.log(err);
  });

  const userSeed = [
    {
      firstname: "adeola",
      lastname: "ibrahim",
      email: "adeola@mail.com",
      password: "ibrahim",
    },
    {
      firstname: "opeyemi",
      lastname: "ibrahim",
      email: "opeyemi@mail.com",
      password: "ibrahim",
    },
    {
      firstname: "ololade",
      lastname: "taiwo",
      email: "ibrahim@mail.com",
      password: "ibrahim",
    },
  ];

  const accountSeed = {
    
userId:"638bac62af3e0fffe64e0b94",
    address: "temitope road ketu",
    accountnumber: "7015009775",
    openingbalance: 4000,
    type: "savings",
  };

  const seedDb = async() => {
    await Signup.deleteMany({});
    await Signup.insertMany(userSeed);
    await Account.deleteMany({});
    await Account.insertMany(accountSeed);
  }

  seedDb().then(() => {
    mongoose.connection.close();

  })