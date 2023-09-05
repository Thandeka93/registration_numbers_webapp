export default function createDatabaseFunctions(database) {
    let licensePlate = "";
    let townId = "";
    let townForeignKey;
    let registrationTable;
    let townRegistrations;
    let isFiltered = false;
    let errorMessage;
    let successMessage;
  
    const licensePlateRegex = /^(CA|CL|CJ|CY)\s\d{3}(-? ?\d{1,3})$/i;
  
    async function setLicensePlate(input) {
      errorMessage = "";
      licensePlate = input.toUpperCase();
  
      if (licensePlateRegex.test(licensePlate)) {
        let existingRegistration = await database.oneOrNone(
          "SELECT * FROM reg_numbers WHERE reg_number=$1",
          [licensePlate]
        );
  
        // console.log(
        //   "SQL Query:",
        //   "SELECT * FROM reg_numbers WHERE reg_number=$1",
        //   [licensePlate]
        // );
  
        if (!existingRegistration) {
          townForeignKey = townId.town_id;
          await database.none(
            "INSERT INTO reg_numbers (reg_number, town_id) VALUES ($1, $2)",
            [licensePlate, townForeignKey]
          );
        } else {
          errorMessage = "Registration number already exists";
        }
        registrationTable = await database.manyOrNone("SELECT * FROM reg_numbers");
        isFiltered = false;
      }
      licensePlate = "";
      townId = "";
    }
  
    async function setTown(input) {
      let twoLetterCode = input.slice(0, 2).toUpperCase();
      try {
        townId = await database.oneOrNone(
          "SELECT town_id FROM towns WHERE town_code  = $1",
          [twoLetterCode]
        );
      } catch (err) {
        console.log(err);
      }
    }
  
    async function resetRegistrations() {
      try {
        successMessage = "";
        townRegistrations = [];
        registrationTable = [];
        let registrationsArray = await database.manyOrNone("SELECT * FROM reg_numbers");
        registrationsArray.length > 0
          ? ""
          : (successMessage = "No registrations to clear");
        await database.none("TRUNCATE TABLE reg_numbers RESTART IDENTITY CASCADE");
        let totalRegistrations = await database.oneOrNone(
          "SELECT COUNT(reg_number) FROM reg_numbers"
        );
        return totalRegistrations;
      } catch (err) {
        console.log(err);
      }
    }
  

    async function showRegistrationsForTown(inputTown) {
      try {
        if (inputTown !== "") {
          licensePlate = "";
          townId = "";
          let townIdObject;
          townIdObject = await database.oneOrNone(
            "SELECT town_id FROM towns WHERE town_code  = $1",
            [inputTown]
          );
          let showFromTownId = townIdObject.town_id;
          townRegistrations = await database.manyOrNone(
            "SELECT * FROM reg_numbers WHERE town_id=$1",
            [showFromTownId]
          );
        } else {
          townRegistrations = await database.manyOrNone(
            "SELECT * FROM reg_numbers"
          );
        }
      } catch (err) {
        console.log(err);
      }
      isFiltered = true;
    }
  
    async function getRegistrations() {
      if (isFiltered) {
        return townRegistrations;
      } else {
        return registrationTable;
      }
    }
  
    function getErrorMessage() {
      return errorMessage;
    }
  
    function getSuccessMessage() {
      return successMessage;
    }
  
    return {
      setLicensePlate,
      getRegistrations,
      setTown,
      resetRegistrations,
      showRegistrationsForTown,
      getErrorMessage,
      getSuccessMessage,
    };
  }
  