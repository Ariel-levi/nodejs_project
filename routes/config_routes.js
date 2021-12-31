const indexR = require("./index");
const usersR = require("./users");
const toysR = require("./toys");

exports.routesInit = (app) => {
  app.use("/", indexR);
  app.use("/users", usersR);
  app.use("/toys", toysR);

  // 404
  app.use((req, res) => {
    //.status(404) -> page status
    // Critical for customer side to directly recognize that they have a mistake in the request
    res.status(404).json({ msg_error: "Url not found , 404!" });
  });
};

// Allows another domain server to make requests to our server through a browser
exports.corsAccessControl = (app) => {
  app.all("*", function (req, res, next) {
    if (!req.get("Origin")) return next();
    // * -> In reality instead of an asterisk, we'll put a domain name that has an access certificate.
    // to the server
    res.set("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.set(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type,auth-token"
    );
    next();
  });
};
