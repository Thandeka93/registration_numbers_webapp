export default function LicensePlateValidator() {
  const licensePlateRegex = /^(CA|CL|CJ|CY)\s\d{3}(-? ?\d{1,3})$/i;
  let errorMessage;

  function validateLicensePlate(licensePlate) {
    errorMessage = "";
    if (!licensePlateRegex.test(licensePlate)) {
      errorMessage = "Please enter a valid registration number";
    }
    if (licensePlate === "") {
      errorMessage = "Please provide a registration number";
    }
    return errorMessage;
  }

  return {
    validateLicensePlate,
  };
}

// export default function LicensePlateValidator() {
//   const licensePlateRegex = /^(CA|CL|CJ|CY)\s\d{3}(-? ?\d{1,3})$/i;
//   let errorMessage;
//   const registeredLicensePlates = new Set();

//   function validateLicensePlate(licensePlate) {
//     errorMessage = "";
    
//     if (!licensePlateRegex.test(licensePlate)) {
//       errorMessage = "Please enter a valid registration number";
//     } else if (licensePlate === "") {
//       errorMessage = "Please provide a registration number";
//     } else if (registeredLicensePlates.has(licensePlate)) {
//       errorMessage = "Registration number already exists";
//     } else {
//       registeredLicensePlates.add(licensePlate);
//     }
    
//     return errorMessage;
//   }

//   return {
//     validateLicensePlate,
//   };
// }

