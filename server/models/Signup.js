import mongoose from 'mongoose';

const User = mongoose.model(
  "User",
  mongoose.Schema({
    firstname: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    lastname: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
  },   { timestamps: true })
);
mongoose.models = {}; 
export default User;