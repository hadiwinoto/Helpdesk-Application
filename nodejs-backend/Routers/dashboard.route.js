const { authJwt } = require("../middleware");

module.exports = app => {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

    const dashboard_controller = require("../Controllers/dashboard.controller.js");
  
    var router = require("express").Router();
  
    router.get("/",[authJwt.verifyToken], dashboard_controller.index);

    app.use('/api/dashboard', router);
  };  