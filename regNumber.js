export default function LicensePlateValidator() {
  const licensePlateRegex = /^(CA|CL|CJ|CY)\s\d{3}(-? ?\d{1,3})$/i;
  let errorMessage;

  function validateLicensePlate(licensePlate) {
    errorMessage = "";
    if (!licensePlateRegex.test(licensePlate)) {
      errorMessage = "Please enter a valid registration number";
    }
    if (licensePlate === "") {
      errorMessage = "Input is empty; please enter a registration number";
    }
    return errorMessage;
  }

  return {
    validateLicensePlate,
  };
}
