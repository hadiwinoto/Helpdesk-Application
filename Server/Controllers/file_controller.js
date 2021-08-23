
// const { response } = require("express");
const db = require("../Models");
const multer = require('multer')
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
        fileid : req.body.fileid,
        base64 : req.body.base64,
        filename: req.body.filename,
        type: req.body.type,
        
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

exports.getFile = (req,res) => {
    var fileid = req.params.fileid;
    Filechat.findByPk(fileid)
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
        message: "Error retrieving Data with id=" + fileid
      })
    })
}