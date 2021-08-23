module.exports = app => {

  const file_controller = require("../Controllers/file_controller.js");
  const { authJwt } = require('../Middleware');

  var router = require("express").Router();

  router.get("/getfile/:fileid", file_controller.getFile);
  router.post("/upload", file_controller.create);

  app.use('/api/file',[authJwt.verifyToken], router);
};  