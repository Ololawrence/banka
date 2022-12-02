import mongoose from "mongoose";

const Credit = mongoose.model(
  "Credit",
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      type: {
        type: String,
        required: true,
      },
      accountnumber: {
        type: Number,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      oldbalance: {
        type: Number,
        required: true,
      },
      currentbalance: {
        type: Number,
        required: true,
      },
    },
    { timestamps: true }
  )
);

export default Credit;
