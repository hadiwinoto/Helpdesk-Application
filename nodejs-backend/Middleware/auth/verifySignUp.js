const db = require("../../Models");
const ROLES = db.ROLES;
const users_model = db.users_model;

checkDuplicateUsernameOrEmail = (req,res,next) =>{
    // Username
    users_model.findOne({
        where: {
            username: req.body.username
        }
        }).then(user => {
        if (user) {
            res.status(200).send({
                status: -1,
                message: "Failed! Username is already in use"
            });
        return;
        }

        users_model.findOne({
            where : {
                email: req.body.email
            }  
        })
        .then((user) => {
            if (user) {
                res.status(200).send({
                  status: -1,
                  message: "Failed! Email is already in use!"
                });
                return;
            }
            next();
        });
    });
}

checkRolesExisted  = (req,res,next) =>{
    console.log(req.body.roles)
    if(req.body.roles){
        for (let i = 0; i < req.body.roles.length; i++) {
            if(!ROLES.includes(req.body.roles[i])){
                res.status(200).send({
                    status: false,
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                  return;
            }
        }
    }
    next();
}


const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;

  