const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
  let header = req.get("Authorization");
  let signedToken;

  if (header) {
    signedToken = header.split(" ")[1];
  }
  if (signedToken) {
    try {
      let decodedToken = jwt.sign(signedToken, process.env.JWTSECRET);
      console.log(decodedToken, "decoded Token");
      req.user_token = decodedToken;
      next();
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(500).json({ message: "You are not authorized access" });
  }
};

module.exports = {
  verifyJwt,
};
