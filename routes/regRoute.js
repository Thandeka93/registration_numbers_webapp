export default function RegistrationsRoute(factoryFunc, dbFunc) {
  async function home(req, res) {
    try {
      res.render("home", {
        registrations: await dbFunc.getRegistrations(),
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function registrations(req, res) {
    try {
      let input = req.body.input;
  
      // Validate the license plate using your factory function
      const licensePlateValidationResult = factoryFunc.validateLicensePlate(input);
  
      if (licensePlateValidationResult === "Please provide a registration number") {
        // Display an error message when input is empty
        req.flash("error-msg", "Please provide a registration number");
      } else if (licensePlateValidationResult === "Please enter a valid registration number") {
        // Display an error message when input is not in the correct format
        req.flash("error-msg", "Invalid town code");
      } else {
        // Input is valid, set the town and license plate
        const registrationError = await dbFunc.setLicensePlate(input);
  
        if (registrationError === "Registration number already exists") {
          // Display an error message when the registration number already exists
          req.flash("error-msg", "Registration number already exists");
        } else {
          await dbFunc.setTown(input);
        }
      }
  
      // Fetch the updated list of registration numbers
      const registrations = await dbFunc.getRegistrations();
  
      // Render the home page with the updated registrations
      res.render("home", { registrations });
    } catch (err) {
      console.log(err);
    }
  }
  
  

  async function reset(req, res) {
    try {
      await dbFunc.resetRegistrations();
      req.flash("msg", dbFunc.getSuccessMessage());
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  }

  async function filter(req, res) {
    try {
      let currentTown = req.body.towns;
  
      // Check if the town exists before showing registrations
      const townExists = await dbFunc.showRegistrationsForTown(currentTown);
  
      if (!townExists) {
        // Display an error message when the town is not found in the database
        req.flash("error-msg", "Cannot filter a town that was not added");
      } 
      // else {
      //   // Town was added successfully, so clear the error message if it was previously set
      // req.flash("error-msg", ""); // Clear any existing error message
      // }
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  }
  
  return {
       home, 
      registrations, 
      reset, 
      filter 
  };
}