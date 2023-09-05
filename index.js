import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import flash from "express-flash";
import session from "express-session";
import pgPromise from 'pg-promise'
import dotenv from "dotenv";
import LicensePlateValidator from "./regNumber.js";
import RegistrationsRoute from "./routes/regRoute.js";
import createDatabaseFunctions from "./service/query.js";

dotenv.config();

const app = express();

const connectionString =
  process.env.PGDATABASE_URL ||
  'postgres://ljcryklx:17IVgrItzi1bhwM8qdkau3UVWVCXHkDF@drona.db.elephantsql.com/ljcryklx';

const pgp = pgPromise();
const db = pgp(connectionString);

const factoryFunc = LicensePlateValidator();
const dbFunc = createDatabaseFunctions(db);
const registrationsRoute = RegistrationsRoute(factoryFunc, dbFunc);

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

app.get("/", registrationsRoute.home);
app.post("/reg_numbers", registrationsRoute.registrations);
app.post("/reset", registrationsRoute.reset);
app.post("/filter", registrationsRoute.filter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log(`app started on port: ${PORT}`);
});