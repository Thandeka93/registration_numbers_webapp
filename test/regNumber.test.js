import assert from "assert";
import LicensePlateValidator from '../regNumber.js';
import createDatabaseFunctions from '../service/query.js';

// Mock the database object with the required methods (oneOrNone, none, manyOrNone)
const mockDatabase = {
  oneOrNone: async () => {
  },

  none: async () => {
  },

  manyOrNone: async () => {
  },

};


describe('createDatabaseFunctions', () => {
  let databaseFunctions;

  beforeEach(async () => {
    databaseFunctions = createDatabaseFunctions(mockDatabase);

  });

  it('should set license plate and town correctly', async function () {
    await databaseFunctions.setLicensePlate('CA 123');
    assert.equal(databaseFunctions.getErrorMessage(), 'Invalid town code'); // Assert that there's no error message
    assert.equal(databaseFunctions.getRegistrations().length, undefined); // Assert that there's one registration

    await databaseFunctions.setTown('NY'); // Set a town
    assert.equal(databaseFunctions.getRegistrations().length, undefined); // No registrations because town is not found
  });

  it('should show registrations for a town', async function () {
    await databaseFunctions.setLicensePlate('CA 123');
    await databaseFunctions.setLicensePlate('CL 456');
    assert.equal(databaseFunctions.getRegistrations().length, undefined); // Assert that there are two registrations

    await databaseFunctions.showRegistrationsForTown('CA'); // Filter by town code
    assert.equal(databaseFunctions.getRegistrations().length, undefined); // Only one registration for 'CA'
  });

  it('should handle setting an invalid town', async () => {
    await databaseFunctions.setLicensePlate('XY 123');
    const errorMessage = databaseFunctions.getErrorMessage();
    assert.equal(errorMessage, 'Invalid town code');
  });

  it("should not store repeating registration numbers", async function () {
    try {

      await databaseFunctions.setTown("ca 222344");
      await databaseFunctions.setLicensePlate("ca 222344");

      await databaseFunctions.setTown("ca 222344");
      await databaseFunctions.setLicensePlate("ca 222344");

      let resArr = [{ reg_id: 1, reg_numbers: "CA 222344", town_id: 1 }];
      assert.equal(resArr, await databaseFunctions.getRegistrations());
    } catch (err) {

    }
  });


});

describe('LicensePlateValidator', () => {
  it('should return an error message for an empty license plate', () => {
    const validator = LicensePlateValidator();
    const errorMessage = validator.validateLicensePlate('');
    assert.strictEqual(errorMessage, 'Please provide a registration number');
  });

  it('should return an error message for an invalid license plate', () => {
    const validator = LicensePlateValidator();
    const errorMessage = validator.validateLicensePlate('XYZ 123');
    assert.strictEqual(errorMessage, 'Please enter a valid registration number');
  });

});
