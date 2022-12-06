process.env.NODE_ENV = "test";

import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import inputs from "./mockdata.js";
import { generateAuthToken } from "./mockdata.js";
chai.use(chaiHttp);
chai.should();

let token = generateAuthToken({ _id: "638bac62af3e0fffe64e0b94" });
let resp = "";
describe("user should be able to debit bank account", () => {
  describe("POST /api/user/debit/7015009775", () => {
    describe("When user wants to debit a user's bank account",async () => {
      before(async () => {
        token

        });
        resp = await chai
          .request(app)
          .post("/api/user/account")
          .set("x-access-token", token)
          .send(inputs.createAccount);
      });

      // Throw error 403 if unauthorized user tries to debit user bank account
      it("Send unauthorized message if user is not authorized", async () => {
        const res = await chai
          .request(app)
          .post(`/api/user/debit/7015009775`)
          .set("x-access-token",23456787654)
          .send({ amount: "400" });
          expect(res).to.have.status(500);
          expect(res.body)
          .to.have.property("error")
          .to.deep.equal("Invalid Token");
      });

      // Respond with error 404 if account number to be debited does not exist
      it("should respond with error 404 - not found - if account number does not exist", async () => {
        const res = await chai
          .request(app)
          .post("/api/user/debit/111111111")
          .set("Authorization", token)
          .send({ amount: "400" });
        expect(res).to.have.status(404);
        expect(res.body)
          .to.have.property("message")
          .to.deep.equal("Account does not exist");
      });

      // Get an error response if token is invalid or expired - status code 401
      it("should respond with error 401 - access denied or no token provided", async () => {
        const res = await chai
          .request(app)
          .post(`/api/user/debit/7015009775`)
         
          .send({ amount: "400" });
        expect(res).to.have.status(401);
        expect(res.body)
          .to.have.property("error")
          .to.deep.equal("Access Denied. No Token Provided");
      });

      // Get 201 status code if account is successfully debited
      it.skip("should respond with a status code 201 if account is successfully debited", (done) => {
        chai
          .request(app)
          .post(`/api/user/debit/7015009775`)
          .set("Authorization", token)
          .send({ amount: "700" })
          
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property("message")
            .to.deep.equal("your account 7015009775 was debited with #700");
       
            done();
          });
      });

      it.skip("should respond with a status code 400 if balance is not enough for debit transaction", (done) => {
        chai
          .request(app)
          .post(`/api/user/debit/7015009775`)
          .set("Authorization", token)
          .send({ amount: "11000" })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body)
              .to.have.property("error")
              .to.deep.equal("insufficient fund");
            done();
          });
      });
    });
  });

describe("user should be able to credit bank account", () => {
  describe("POST /api/user/credit/<account_number>", () => {
    describe("When user wants to credit a user's bank account",async () => {
      before(async () => {
        token

        });
        resp = await chai
          .request(app)
          .post("/api/user/account")
          .set("x-access-token", token)
          .send(inputs.createAccount);
      });

      // Throw error 403 if unauthorized user tries to credit user bank account
      it("Send unauthorized message if user is not authorized", async () => {
        const res = await chai
          .request(app)
          .post(`/api/user/credit/7015009775`)
          .set("x-access-token",23456787654)
          .send({ amount: "400" });
          expect(res).to.have.status(500);
          expect(res.body)
          .to.have.property("error")
          .to.deep.equal("Invalid Token");
      });

      // Respond with error 404 if account number to be credited does not exist
      it("should respond with error 404 - not found - if account number does not exist", async () => {
        const res = await chai
          .request(app)
          .post("/api/user/credit/111111111")
          .set("Authorization", token)
          .send({ amount: "400" });
        expect(res).to.have.status(404);
        expect(res.body)
          .to.have.property("message")
          .to.deep.equal("Account does not exist");
      });

      // Get an error response if token is invalid or expired - status code 401
      it("should respond with error 401 - access denied or no token provided", async () => {
        const res = await chai
          .request(app)
          .post(`/api/user/credit/7015009775`)
         
          .send({ amount: "400" });
        expect(res).to.have.status(401);
        expect(res.body)
          .to.have.property("error")
          .to.deep.equal("Access Denied. No Token Provided");
      });

      // Get 201 status code if account is successfully credited
      it.skip("should respond with a status code 201 if account is successfully credited", (done) => {
        chai
          .request(app)
          .post(`/api/user/credit/7015009775`)
          .set("Authorization", token)
          .send({ amount: "700" })
          
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("message")
            .to.deep.equal("your account 7015009775 was credited with #700");
       
            done();
          });
      });

      it.skip("should respond with a status code 200 if account is crdited", (done) => {
        chai
          .request(app)
          .post(`/api/user/credit/7015009775`)
          .set("Authorization", token)
          .send({ amount: "11000" })
          .end((err, res) => {
            console.log(res)
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("message");
            done();
          });
      });
    });
  });

