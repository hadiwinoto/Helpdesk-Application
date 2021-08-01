
// const { response } = require("express");
const db = require("../Models");
const UserConnectModel = db.users_model;
const op = db.Sequelize.Op;

exports.create = (req, res) => {

    // bcrypt
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const hash = bcrypt.hashSync(req.body.password, saltRounds);

    // Validate request
    if(!req.body) {
        res.status(400).send({
          status: false,
          message: "Content can not be empty!"
        });
        return;
    }

    const createUser = {
        username : req.body.username,
        fullname : req.body.fullname,
        address : req.body.address,
        password : hash,
        gender : req.body.gender,
        email : req.body.email,
        mobile_number : req.body.mobile_number,
        photo_profile : req.body.photo_profile,
        active : '0'
    };

    UserConnectModel.create(createUser)
    .then(data => {
        res.send({
          status : true,
          data : data
        });
    })
    .catch(err => {
        res.status(500).send({
          status: false,
          message : err.message ||  "Some error occurred while creating the User."
        });
    });
  
};

exports.getList = (req,res) => {
    
    const username = req.query.username;
    var condition = username ? {username : {[op.like] : `%${username}%`}} : null;

    UserConnectModel.findAll({where : condition})
    .then(data =>{
      res.send({
        status : true,
        data : data
      });
    })
    .catch(err=>{ 
        res.status(500).send({
          status : false,
          message : err.message || "Some error occurred while retrieving Users."
        })
    })

}

exports.get = (req,res) => {
    var id = req.params.id;
   
    UserConnectModel.findByPk(id)
    .then(data =>{
      res.send({
        status: 1,
        data : data || "Username no Existing"
      });
    })
    .catch(err =>{
      res.status(500).send({
        status : -1,
        message: "Error retrieving Username =" + id
      })
    })
}

exports.update = (req,res) => {

  const id = req.params.id;
    console.log(id)
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        status: false,
        message: "Content can not be empty!"
      });
    }

    UserConnectModel.update(req.body,{
    where : {username : id}
  })
  .then(num =>{
    if(num == 1){
      res.send({
        status : true,
        message: "User was updated successfully."
      });
    }else{
      res.send({
        status : false,
        message: `Cannot User id=${id}. Maybe User was not found or req.body is empty!`
      });
    }
  })
  .catch(err =>{
    res.status(500).send({
      status : false,
      message: "Error updating User with id=" + id
    });
  })

}

exports.delete = (req,res) => {
  
  const id = req.params.id;

  UserConnectModel.destroy({
    where : {username : id}
  })
  .then(num =>{
    if(num == 1){
      res.send({
        status : true,
        message: "User was Deleted successfully."
      });
    }else{
      res.send({
        status : false,
        message: `Cannot delete User with id=${id}. Maybe Update Info was not found!`
      });
    }
  })
  .catch(err =>{
    res.status(500).send({
      status : false,
      message: "Error Deleted User with id=" + id
    });
  })

}

exports.deleteAll = (req, res) => {
    UserConnectModel.destroy({
    truncate: false
  })
    .then(nums => {
      res.send({ 
        status : true,
        message: `Users were deleted successfully!` 
      });
    })
    .catch(err => {
      res.status(500).send({
        status:false,
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};