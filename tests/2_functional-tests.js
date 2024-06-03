const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    this.timeout(5000);

    test('Test GET /api/convert with valid input', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=10L')
          .end(function (err, res) {
            assert.equal(res.body.initNum, 10);
            assert.equal(res.body.initUnit, 'L');
            assert.approximately(res.body.returnNum, 2.64172, 0.0001);
            assert.equal(res.body.returnUnit, 'gal');
            done();
        });
    });

    test('Test GET /api/convert with invalid unit', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=10r')
          .end(function (err, res) {
            assert.equal(res.text, "invalid unit");
            done();
        });
    });

    test('Test GET /api/convert with invalid number', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=3/7.2/4kg')
          .end(function (err, res) {
            assert.equal(res.text, "invalid number");
            done();
        });
    });

    test('Test GET /api/convert with invalid number and unit', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=3/7.2/4mm')
          .end(function (err, res) {
            assert.equal(res.text, "invalid number and unit");
            done();
        });
    });

    test('Test GET /api/convert with no number', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=mi')
          .end(function (err, res) {
            assert.equal(res.body.initNum, 1);
            assert.equal(res.body.initUnit, 'mi');
            done();
        });
    });
    
});
