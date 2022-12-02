process.env.NODE_ENV = "test";
import mongoose from "mongoose";
import Auth from "../models/Signup.js";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import inputs from "./mockdata.js";
chai.use(chaiHttp);
chai.should();


describe("Default API Route", () => {
    beforeEach((done) => {
      Auth.remove({}, (err) => {
        done();
      });
    });
  it("should return 200 HTTP success code when pointed to the default route", async () => {
    const res = await chai.request(app).get("/");
    expect(res).to.have.status(200);
  });
});

describe("signup route POST /api/auth/signup", () => {

    describe("When the user tries to signup an account on the application", (done) => {
      it("should return 201 status code  if user is successfully created", (done) => {
        chai
          .request(app)
          .post("/api/auth/signup")
          .send(inputs.validSignupInputs)
          .end((err, res) => {
            expect(res).to.have.status(201);
            done();
             expect(res.body.data).to.have.property("_id");
             expect(res.body.data).to.have.property("email");
          });
      });

              it('should return an error message and 409 if user already exists', (done) => {
        chai.request(app).post('/api/auth/signup').send(inputs.validSignupInputs).end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.have.property('error').to.be.a('string');
          done();
        });
      });

       it("should return an error message and status code 422 when email address is invalid", (done) => {
         chai
           .request(app)
           .post("/api/auth/signup")
           .send({ email: "bankagmail.com" })
           .end((err, res) => {
             expect(res).to.have.status(422);
             expect(res.body).to.have.property("errors").to.be.a("array");
            //  expect(res.body.errors[0].email).to.have.property("email").to.be.a("string");
             done();
           });
       });
       it("should return an error message and status code 422 when name is not given", (done) => {
         chai
           .request(app)
           .post("/api/auth/signup")
           .send(inputs.validLoginInputs)
           .end((err, res) => {
             expect(res).to.have.status(422);
             expect(res.body).to.have.property("errors").to.be.a("array");
             done();
           });
       });
    });
});
