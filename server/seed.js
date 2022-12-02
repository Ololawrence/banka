import mongoose from 'mongoose';
import Signup from './models/Signup.js';
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

  const seedDb = async() => {
    await Signup.deleteMany({});
    await Signup.insertMany(userSeed);
  }

  seedDb().then(() => {
    mongoose.connection.close();

  })