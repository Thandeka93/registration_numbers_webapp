import assert from 'assert';
import SelectTown from '../registration.js'; 

describe('SelectTown', () => {
  it('should set and get selected town', () => {
    const townSelector = SelectTown();
    townSelector.setTown('ExampleTown');
    const selectedTown = townSelector.getTown();
    assert.strictEqual(selectedTown, 'ExampleTown');
  });

  it('should set and get registration number', () => {
    const townSelector = SelectTown();
    townSelector.setRegistration('ABCD123');
    const registrationNumber = townSelector.getRegistration();
    assert.strictEqual(registrationNumber, 'ABCD123');
  });

  it('should reset registration number', () => {
    const townSelector = SelectTown();
    townSelector.setRegistration('ABCD123');
    townSelector.resetRegistration();
    const registrationNumber = townSelector.getRegistration();
    assert.strictEqual(registrationNumber, '');
  });
});
