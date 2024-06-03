'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {

    let initNum = convertHandler.getNum(req.query.input);
    let initUnit = convertHandler.getUnit(req.query.input);

    if (initNum === null && !initUnit){
      res.send('invalid number and unit');
    } else if (initNum === null) {
      res.send('invalid number');
    } else if (!initUnit) {
      res.send('invalid unit');
    } else {

      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let returnNum = convertHandler.convert(initNum, initUnit)

      var response = {
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string: convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
      }
  
      res.json(response)
    }

    
  })

};
