module.exports = app => {

    const chat_controller = require("../Controllers/chat_controller.js");
  
    var router = require("express").Router();
  
    router.post("/", chat_controller.CreateRoom);
    
    router.post("/send", chat_controller.SendChat);

    router.get("/send", chat_controller.ChatDetails);

    router.get("/", chat_controller.ListChat);
  
    
    app.use('/api/chat', router);
  };  