process.env.NODE_ENV = "test";
import mongoose from "mongoose";
import Auth from "../models/Signup.js";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import inputs from "./mockdata.js";
import jwt from 'jsonwebtoken';
import {generateAuthToken} from './mockdata.js';
chai.use(chaiHttp);
chai.should();

let token = generateAuthToken({id:2})


describe('Create Bank Account Route', () => {
 describe("POST /api/user/account", () => {
   describe("When a Registered user tries to create a bank account", () => {
     it("should respond with error message and status code 401 if no token is provided", async () => {
       const res = await chai
         .request(app)
         .post("/api/user/account")
         .send(inputs.createAccount);
       expect(res).to.have.status(401);
       expect(res.body).to.have.property("error");
     });

     it("should respond with error message and status code 401 if header token is invalid", async () => {
       const res = await chai
         .request(app)
         .post("/api/user/account")
         .set("x-access-token", 23454848)
         .send({ type: "savings" });
       expect(res).to.have.status(500);
       expect(res.body).to.have.property("error");
     });


   });
 });
});

describe('GET api/user/account', () => {
  describe('Users Can View All Thier Account', () => {
    describe('When a Registered and authenticated user tries to view his/her accounts', () => {
      it('should return status 400 if user account not found', async () => {
        const res = await chai
          .request(app)
          .get('/api/user/account')
          .set('x-access-token', token);
        expect(res).to.have.status(400);
      });
    });
  });
});