import mongoose from "mongoose";


const AccountSchema = new mongoose.Schema({

    
      userId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      address: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
      },
      accountnumber: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
      },
      openingbalance: {
        type: Number,
        required: true,
      },
      accountbalance: {
        type: Number,
      },
      type: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
      },
    },
    { timestamps: true }
);
 mongoose.models = {} 
let Account = mongoose.model("Account", AccountSchema);

export default Account;