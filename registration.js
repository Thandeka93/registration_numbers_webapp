export default function SelectTown() {
  const towns = {
    Gauteng: /^[A-Z]{2} \d{2} GP$/,
    CapeTown: /^CA \d{3}-\d{3}$/,
    Durban: /^ND \d{3}-\d{3}$/
  };

  let townSelected = "";
  let registrationNumber = "";
  let errorMessage = "";

  function setTown(selectedTown) {
    townSelected = selectedTown;
    // Clear registration and error message when town is changed
    registrationNumber = "";
    errorMessage = "";
  }

  function getTown() {
    return townSelected;
  }

  function setRegistration(registration) {
    if (!registration) {
      errorMessage = "Please enter a registration number.";
    } else if (townSelected && towns[townSelected]) {
      if (towns[townSelected].test(registration)) {
        registrationNumber = registration;
        errorMessage = "";
      } else {
        errorMessage = "Registration number format does not match the selected town.";
      }
    } else {
      errorMessage = "Please select a town first.";
    }
  }

  function getRegistration() {
    return registrationNumber;
  }

  function getErrorMessage() {
    return errorMessage;
  }

  function resetRegistration() {
    registrationNumber = "";
    errorMessage = "";
  }

  return {
    setTown,
    getTown,
    setRegistration,
    getRegistration,
    getErrorMessage,
    resetRegistration
  };
}
