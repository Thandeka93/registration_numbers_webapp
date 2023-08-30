export default function SelectTown() {
    let townSelected = "";
    let registrationNumber = "";
  
    function setTown(selectedTown) {
      townSelected = selectedTown;
    }
  
    function getTown() {
      return townSelected;
    }
  
    function setRegistration(registration) {
      registrationNumber = registration;
    }
  
    function getRegistration() {
      return registrationNumber;
    }
  
    function resetRegistration() {
      registrationNumber = "";
    }
  
    return {
      setTown,
      getTown,
      setRegistration,
      getRegistration,
      resetRegistration
    };
  }
  