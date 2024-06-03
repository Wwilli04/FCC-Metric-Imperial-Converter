function ConvertHandler() {

  const regex = /^([0-9\/\.]+)?( ?\w+)$/;

  
  this.getNum = function(input) {

    if (input.match(regex)) {
      var inputNumber = input.match(regex)[1];
      if (inputNumber === undefined) {
        inputNumber = "1";
      }

      if (inputNumber.split('/').length > 2) { // don't allow compound fractions
        return null;
      } else {
        return eval(inputNumber); 
      }
      
    }
    else {
      return null;
    }
  };
  
  this.getUnit = function(input) {

    if (input.match(regex)) {
      const inputString = input.match(regex)[2];
      const legalUnitsRegex = /^gal$|^L$|^mi$|^km$|^kg$|^lbs$/i
      if (inputString.match(legalUnitsRegex)) {
        if (inputString.toLowerCase() == 'l') {
          return 'L';
        } else {
          return inputString;
        }
        
      } else {
        return null;
      }
    }

    else {
      return null;
    }
  };
  
  this.getReturnUnit = function(inputUnit) {

    switch (inputUnit.toLowerCase()) {
      case 'gal':
        return 'L'
      case 'l':
        return 'gal'
      case 'mi':
        return 'km'
      case 'km':
        return 'mi'
      case 'kg':
        return 'lbs'
      case 'lbs':
        return 'kg'
      default:
        return null
    }

  };

  this.spellOutUnit = function(unit) {
    switch (unit.toLowerCase()) {
      case 'l':
        return 'liters'
      case 'gal':
        return 'gallons'
      case 'km':
        return 'kilometers'
      case 'mi':
        return 'miles'
      case 'kg':
        return 'kilograms'
      case 'lbs':
        return 'pounds'
      default:
        return 'unknown'
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit.toLowerCase()){
      case 'gal':
        return initNum * galToL
      case 'l':
        return initNum / galToL
      case 'lbs':
        return initNum * lbsToKg
      case 'kg':
        return initNum / lbsToKg
      case 'mi':
        return initNum * miToKm
      case 'km':
        return initNum / miToKm
      default:
        return null
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {

    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
