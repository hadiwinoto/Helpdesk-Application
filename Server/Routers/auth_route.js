const AuthCheck = require('../Middleware');
const controller = require('../Controllers/auth_controller')

module.exports = app => {
    
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
          );
          next();
    })
    
    app.post("/api/auth/signup",[
        AuthCheck.checkDuplicateUsernameOrEmail,
        AuthCheck.checkRolesExisted
    ],controller.signup);
  
    app.get("/api/auth/verify", controller.verify);

    app.post("/api/auth/signin", controller.signin);
};