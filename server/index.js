import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotEnv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import accountRoute from "./routes/account.js";
import transactionRoute from "./routes/transactions.js";
const app = express();
dotEnv.config();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
// DB Config

const db = process.env.MONGOURL;
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB successfully connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to  banka app, we are here to serve you better",
  });
});

// app routes
app.use("/api/auth", authRoute);
app.use("/api/user", accountRoute);
app.use("/api/user", transactionRoute);
app.use("*", (req, res) => {
  res.send("route not found");
});
// simple route

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}.`);
});


export default app;