
// const { response } = require("express");
const db = require("../Models");
const Filechat = db.filechat;
const op = db.Sequelize.Op;

exports.create = (req, res) => {

    // Validate request
    if(!req.body) {
        res.status(400).send({
          status: false,
          message: "Content can not be empty!"
        });
        return;
    }
    const file = {
        
    };

    Filechat.create(file)
    .then(data => {
        res.send({
          status : true,
          data : data
        });
    })
    .catch(err => {
        res.status(500).send({
          status: false,
          message : err.message ||  "Some error occurred"
        });
    });
};

exports.get = (req,res) => {
    var id = req.params.filid;
   
    Filechat.findByPk(id)
    .then(data =>{
      if(data){
        res.send({
          status: 1,
          data : data
        });
      }else{
        res.send({
          status: -1,
          message : 'Data Not Found'
        });
      }
    })
    .catch(err =>{
      res.status(500).send({
        status : -1,
        message: "Error retrieving Data with id=" + id
      })
    })
}