"use strict";

const chai = require('chai');

const chaiHttp = require('chai-http');

chai.use(chaiHttp);
var id = "";
describe('User', async () => {
  it('Create User', done => {
    chai.request('http://localhost:4000').post('/user').send({
      email: "alessandroprudencio@gmail.com",
      password: "1234567",
      confirmPassword: "1234567",
      name: "ale"
    }).end((err, res) => {
      chai.expect(err).to.be.null;
      chai.expect(res).to.have.status(200);
      done();
    });
  });
  it('Get User', done => {
    chai.request('http://localhost:4000').get('/user').end((err, res) => {
      if (err) done(err);
      chai.expect(res).to.have.status(200);
      id = res.id;
      done();
    });
  });
  it('delete User', done => {
    chai.request('http://localhost:4000').delete(`/user/${id}`).set('Authorization', 'Bearer Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYXNkc3NzYUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzQ1NjcifSwiYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjM2NjY4MjgsImV4cCI6MTU2MzY3MDQyOH0.6_BPaZZJs8SgpucqJqs1b9ZORt15bsoAG9WyJp7mDMc').end((err, res) => {
      chai.expect(err).to.be.null;
      chai.expect(res).to.have.status(200);
      done();
    });
  });
  it('Get ID user', done => {
    chai.request('http://localhost:4000').get(`/user/${id}`).end((err, res) => {
      chai.expect(err).to.be.null;
      chai.expect(res).to.have.status(200);
      done();
    });
  });
});
//# sourceMappingURL=user.js.map