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
        await dbFunc.setTown(input);
        await dbFunc.setLicensePlate(input);
        req.flash("error-msg", dbFunc.getErrorMessage());
        req.flash("error-text", factoryFunc.validateLicensePlate(input));
        
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
        await dbFunc.showRegistrationsForTown(currentTown);
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