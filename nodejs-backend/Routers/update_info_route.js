module.exports = app => {

    const update_info_controller = require("../Controllers/update_info_controller.js");
  
    var router = require("express").Router();

    router.post("/", update_info_controller.create);
    
    router.get("/", update_info_controller.getList);
  
    router.get("/:id", update_info_controller.get);
    
    router.put("/:id", update_info_controller.update);
  
    router.delete("/:id", update_info_controller.delete);

    router.delete("/", update_info_controller.deleteAll);
    
    app.use('/api/update-ticket-info', router);
  };  