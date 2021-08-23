
// const { response } = require("express");
const db = require("../Models");
const FilechatModel = db.filechat;
const op = db.Sequelize.Op;
const path = require('path')



exports.create = (req,res) => {
  if(!req.body) {
    res.status(400).send({
      status: false,
      message: "Content can not be empty!"
    });
    return;
}

const filechat = {
  filename : req.file.originalname,
  type     : path.extname(req.file.filename),
};

FilechatModel.create(filechat)
    .then(data => {
        res.send({
          status : true,
          data : data
        });
    })
    .catch(err => {
        res.status(500).send({
          status: false,
          message : err.message ||  "Some error occurred while creating the Tutorial."
        });
    });

}

exports.getDataFile = (req,res) => {
  var id = req.params.fileid;
  FilechatModel.findByPk(id)
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
};


