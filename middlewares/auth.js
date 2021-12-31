const jwt = require("jsonwebtoken");
const { config } = require("../config/secret");

exports.auth = (req, res, next) => {
  // Check for a token
  let token = req.header("x-api-key");
  if (!token) {
    return res
      .status(401)
      .json({ msg: "You must send token to this endpoint" });
  }
  try {
    // Check to encode the token and if it is valid
    let decodeToken = jwt.verify(token, config.TokenSecret);
    req.userToken = decodeToken;
    // Switch to the next function
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ msg: "Token invalid (if you hacker) or token expired" });
  }
};
