module.exports = app => {

    var router = require("express").Router();
    const users_controller = require("../Controllers/users_controller.js");
  
    router.post("/", users_controller.create);
    
    router.get("/", users_controller.getList);
  
    router.get("/:id", users_controller.get);
    
    router.put("/:id", users_controller.update);
  
    router.delete("/:id", users_controller.delete);
    
    router.delete("/", users_controller.deleteAll);

    app.use('/api/users', router);  
};