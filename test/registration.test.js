import assert from 'assert';
import SelectTown from '../registration.js'; 

describe('SelectTown', () => {
    let selectTown;
  
    beforeEach(() => {
      selectTown = SelectTown();
    });
  
    it('should set and get the selected town', () => {
      selectTown.setTown('Gauteng');
      assert.strictEqual(selectTown.getTown(), 'Gauteng');
    });
  
    it('should set and get the registration number', () => {
      selectTown.setTown('CapeTown');
      selectTown.setRegistration('CA 123-456');
      assert.strictEqual(selectTown.getRegistration(), 'CA 123-456');
    });
  
    it('should reset registration number and error message', () => {
      selectTown.setTown('Durban');
      selectTown.setRegistration('ND 789-012');
      selectTown.resetRegistration();
      assert.strictEqual(selectTown.getRegistration(), '');
      assert.strictEqual(selectTown.getErrorMessage(), '');
    });
  
  });

