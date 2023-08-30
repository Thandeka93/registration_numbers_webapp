import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import flash from "express-flash";
import session from "express-session";
import pgPromise from "pg-promise";
import SelectTown from './registration.js';



const app = express();
const selectTown = SelectTown();



app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "secret-key",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

// Routes
app.get('/', (req, res) => {
  res.render('home', { 
    town: selectTown.getTown(), 
    registration: selectTown.getRegistration(),
    selectTown: selectTown  // Pass selectTown object to the template
  });
});

app.get('/reg_number/:registration', (req, res) => {
  const { registration } = req.params;
  selectTown.setRegistration(registration); // Set the registration for display
  res.render('home', { town: selectTown.getTown(), registration: selectTown.getRegistration() });
});

app.post('/setTown', (req, res) => {
  const selectedTown = req.body.town;
  selectTown.setTown(selectedTown);
  res.redirect('/');
});

app.post('/setRegistration', (req, res) => {
  const registrationNumber = req.body.registration;
  selectTown.setRegistration(registrationNumber);
  res.redirect('/');
});

// app.post('/resetRegistration', (req, res) => {
//   selectTown.resetRegistration();
//   res.redirect('/');
// });
app.post('/resetRegistration', (req, res) => {
  selectTown.resetRegistration();
  selectTown.setTown(""); // Clear the selected town
  res.redirect('/');
});




const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log(`App started at PORT: ${PORT}`);
});