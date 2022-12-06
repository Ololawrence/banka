process.env.NODE_ENV = "test";
import mongoose from "mongoose";
import Auth from "../models/Signup.js";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import inputs from "./mockdata.js";
chai.use(chaiHttp);
chai.should();

describe("Log In Route", () => {
  describe("POST /api/auth/signin", () => {
    describe("When the user tries to log into their account", () => {
      it("should return 200 status code and token if user is successfully logged in", async () => {
        const res = await chai
          .request(app)
          .post("/api/auth/login")
          .send(inputs.validLoginInputs);

        expect(res).to.have.status(200);
        expect(res.body).to.have.property("token");
        expect(res.body.data).to.have.property("_id");
        expect(res.body.data)
          .to.have.property("email")
        expect(res.body.data)
          .to.have.property("email")
          .eql(inputs.validLoginInputs.email);
      });

      it("should throw an error 401 for not registered email address", async () => {
        const res = await chai
          .request(app)
          .post("/api/auth/login")
          .send(inputs.invalidLoginEmail);
        expect(res).to.have.status(401);

      });

      it("should return an error 401 for invalid password credential", async () => {
        const res = await chai
          .request(app)
          .post("/api/auth/login")
          .send(inputs.invalidLoginPsw);
        expect(res).to.have.status(401);
      });
    });
  });
});
