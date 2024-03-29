const express = require("express");
const path = require("path");
const web3 = require("web3");
const flash = require("express-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const connection = require("./config/connection");
const cookieParser = require("cookie-parser");
//console.log(Country.getAllCountries());
//console.log(State.getAllStates())
//console.log(City.getAllCities())
const app = express();
//connection.connect();
global.db = connection;
const PORT = process.env.PORT || 3000;
const router = require("./routes/users");
//console.log(web3);
//console.log("mukesh");
app.use(
  session({
    secret: "dapp",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(function (req, res, next) {
  res.locals.metaUser = req.session.metaUser;
  res.locals.tokenized = req.session.tokenized;
  res.locals.monetize = req.session.monetize;
  res.locals.cookieConsent = req.session.cookieConsent;
  next();
});
const middlewareFunction = function (req, res, next) {
  if (res.locals.metaUser) next();
  else res.redirect("/");
};
app.use("/public", express.static(__dirname + "/../public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.get("/", router);
app.post("/searchTerm", router);
app.get("/searchTerm", router);
app.get("/searchHistory", middlewareFunction, router);
app.get("/dashboard", middlewareFunction, router);
app.get("/profile", middlewareFunction, router);
app.get("/countryStateCity", router);
app.post("/login", router);
app.get("/logout", router);
app.post("/getstateByCountry", router);
app.post("/getCityByCountry", router);
app.post("/updateProfileData", router);
app.post("/tokenizedMonetize", middlewareFunction, router);
app.post("/tokenizedMonetizeSingle", middlewareFunction, router);
app.get("/ProfileDetails", middlewareFunction, router);
app.get("/deleteSearchTerm/(:id)", middlewareFunction, router);
app.post("/setCookies", router);

//metamask code

//end metamask code
app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
