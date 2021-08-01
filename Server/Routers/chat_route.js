module.exports = app => {

    const chat_controller = require("../Controllers/chat_controller.js");
  
    var router = require("express").Router();
  
    router.post("/", chat_controller.CreateRoom);

    router.get("/", chat_controller.ListChat);

    router.get("/count-list", chat_controller.ListChatCount);
    
    router.get("/send", chat_controller.ChatDetails);
    
    router.post("/send", chat_controller.SendChat);
    
    router.put("/handle", chat_controller.HandleChat);

    router.put("/handover", chat_controller.HandOverHandler);

    router.put("/open", chat_controller.OpenChat);

    router.put("/close", chat_controller.CloseChat);
    
    app.use('/api/chat', router);
  };  