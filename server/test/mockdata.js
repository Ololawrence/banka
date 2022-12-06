import dotenv from 'dotenv';
dotenv.config();
import Jwt  from 'jsonwebtoken';

const inputs = {
  validSignupInputs: {
    firstname: "Ayodeji",
    lastname: "Afolabi",
    email: "xwebyna@gmail.com",
    password: "BankaTest20",
  },

  validLoginInputs: {
    email: "xwebyna@gmail.com",
    password: "BankaTest20",
  },
  invalidLoginPsw: {
    email: "xwebyna@gmail.com",
    password: "Test20129",
  },
  invalidLoginEmail: {
    email: "xwebynaxwebyna@gmail.com",
    password: "BankaTest20",
  },

  createAccount: {
    address:"temitope road ketu",
    phone:"7015009775",
    openingbalance:4000,
    type:"savings"
  },
};

export function generateAuthToken(user) {
    const token = Jwt.sign(
      { id: user._id,},
      process.env.KEY,
      { expiresIn: '24h' }
    );
    return token;
  }


export default inputs;
