const express = require("express");
const path = require("path");
const http = require("http");

require("./db/mongoConnect");

const {routesInit,corsAccessControl} = require("./routes/config_routes")


const app = express();


app.use(express.json());

app.use(express.static(path.join(__dirname,"public")))

//פונקציה שמאפשרת לכל שרת מכל דומיין
// להתחבר אלינו
corsAccessControl(app);
// מאתחל את כל הרואטים הקיימים
routesInit(app);

const server = http.createServer(app);
let port = process.env.PORT || "3000";
server.listen(port);