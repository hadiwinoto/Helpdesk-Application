module.exports = app => {

  const ticket_controller = require("../Controllers/ticket_controller.js");
  const { authJwt } = require('../Middleware');

  var router = require("express").Router();

  router.post("/", ticket_controller.create);
  
  router.get("/", ticket_controller.getList);

  router.get("/:ticket_id", ticket_controller.get);
  
  router.put("/:ticket_id", ticket_controller.update);

  router.delete("/:ticket_id", ticket_controller.delete);

  router.delete("/", ticket_controller.deleteAll);


  app.use('/api/tickets',[authJwt.verifyToken], router);
};  