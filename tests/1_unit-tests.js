const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    this.timeout(5000);

    test('convertHandler should correctly read a whole number input', () =>{
        assert.equal(convertHandler.getNum('15km'), 15);
    })

    test('convertHandler should correctly read a decimal number input', () => {
        assert.equal(convertHandler.getNum('15.5km'), 15.5);
    })

    test('convertHandler should correctly read a fractional input', () => {
        assert.equal(convertHandler.getNum('1/2km'), 0.5);
    })

    test('convertHandler should correctly read a fractional input with a decimal', () => {
        assert.equal(convertHandler.getNum('1.5/2km'), 0.75);
    })

    test('convertHandler should correctly return an error on a double-fraction', () => {
        assert.equal(convertHandler.getNum('1.5/2/3km'), null);
    })

    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', () => {
        assert.equal(convertHandler.getNum('km'), 1);
    })

    test('convertHandler should correctly read each valid input unit', () => {
        assert.isNotNull(convertHandler.getUnit('km'));
        assert.isNotNull(convertHandler.getUnit('mi'));
        assert.isNotNull(convertHandler.getUnit('gal'));
        assert.isNotNull(convertHandler.getUnit('L'));
        assert.isNotNull(convertHandler.getUnit('kg'));
        assert.isNotNull(convertHandler.getUnit('lbs'));
    })

    test('convertHandler should correctly return an error for an invalid input unit', () => {
        assert.isNull(convertHandler.getUnit('r'));
    })

    test('convertHandler should correctly return an error for an invalid input unit', () => {
        assert.isNull(convertHandler.getUnit('r'));
    })

    test('convertHandler should return the correct return unit for each valid input unit', () => {
        assert.equal(convertHandler.getUnit('km'), 'km');
        assert.equal(convertHandler.getUnit('mi'), 'mi');
        assert.equal(convertHandler.getUnit('gal'), 'gal');
        assert.equal(convertHandler.getUnit('L'), 'L');
        assert.equal(convertHandler.getUnit('kg'), 'kg');
        assert.equal(convertHandler.getUnit('lbs'), 'lbs');
    })

    test('convertHandler should correctly return the spelled-out string unit for each valid input unit', () => {
        LSpellings = ['liters', 'litres']
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
        assert.include(LSpellings, convertHandler.spellOutUnit('L'));
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    })

    test('convertHandler should correctly convert gal to L', () => {
        assert.equal(convertHandler.getReturnUnit('gal'), 'L');
        assert.approximately(convertHandler.convert(1,'gal'), 3.78541, 0.00001);
    })

    test('convertHandler should correctly convert L to gal', () => {
        assert.equal(convertHandler.getReturnUnit('L'), 'gal');
        assert.approximately(convertHandler.convert(1,'L'), 0.26417, 0.00001);
    })

    test('convertHandler should correctly convert mi to km', () => {
        assert.equal(convertHandler.getReturnUnit('mi'), 'km');
        assert.approximately(convertHandler.convert(1,'mi'), 1.60934, 0.00001);
    })

    test('convertHandler should correctly convert km to mi', () => {
        assert.equal(convertHandler.getReturnUnit('km'), 'mi');
        assert.approximately(convertHandler.convert(1,'km'), 0.62137, 0.00001);
    })

    test('convertHandler should correctly convert lbs to kg', () => {
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
        assert.approximately(convertHandler.convert(1,'lbs'), 0.45359, 0.00001);
    })

    test('convertHandler should correctly convert kg to lbs', () => {
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
        assert.approximately(convertHandler.convert(1,'kg'), 2.20462, 0.00001);
    })


});