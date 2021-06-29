module.exports = app => {

    const chat_controller = require("../Controllers/chat_controller.js");
  
    var router = require("express").Router();
  
    router.post("/", chat_controller.create);
    
    router.get("/", chat_controller.getList);
  
    app.use('/api/chat', router);
  };  