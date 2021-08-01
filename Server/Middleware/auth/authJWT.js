const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");
const db = require("../../Models");
const User = db.users_model;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        status: -1,
        message: "No token provided!"
      });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status :-1,
          message: "Toked Not Valid"
        });
      }
      req.userId = decoded.id;
      next();
    });
  };
  
  const authJwt = {
    verifyToken: verifyToken
  };

  module.exports = authJwt;