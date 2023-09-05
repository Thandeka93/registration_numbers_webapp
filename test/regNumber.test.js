import assert from "assert";
import LicensePlateValidator from '../regNumber.js';
// import createDatabaseFunctions from '../service/query.js';
// import pgp from 'pg-promise';

describe('LicensePlateValidator', () => {
    it('should return an error message for an empty license plate', () => {
      const validator = LicensePlateValidator();
      const errorMessage = validator.validateLicensePlate('');
      assert.strictEqual(errorMessage, 'Input is empty; please enter a registration number');
    });
  
    it('should return an error message for an invalid license plate', () => {
      const validator = LicensePlateValidator();
      const errorMessage = validator.validateLicensePlate('XYZ 123');
      assert.strictEqual(errorMessage, 'Please enter a valid registration number');
    });
  
  });
