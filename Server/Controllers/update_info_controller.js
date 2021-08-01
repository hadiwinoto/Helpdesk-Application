
// const { response } = require("express");
const db = require("../Models");
const TicketComplaintInfo = db.update_info_model;
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

    const update_info = {
        ticket_id : req.body.ticket_id,
        uid : req.body.uid,
        update_info : req.body.update_info,
        description_info : req.body.description_info,
        file_id : req.body.file_id
    };

    TicketComplaintInfo.create(update_info)
    .then(data => {
        res.send({
          status : true,
          data : data
        });
    })
    .catch(err => {
        res.status(500).send({
          status: false,
          message : err.message ||  "Some error occurred while creating the Update Ticket."
        });
    });
  
};

exports.getList = (req,res) => {
    
    const ticket_id = req.query.ticket_id;
    var condition = ticket_id ? {ticket_id : {[op.like] : `%${ticket_id}%`}} : null;

    TicketComplaintInfo.findAll({where : condition})
    .then(data =>{
      res.send({
        status : true,
        data : data
      });
    })
    .catch(err=>{ 
        res.status(500).send({
          status : false,
          message : err.message || "Some error occurred while retrieving Update Info."
        })
    })

}

exports.get = (req,res) => {
    var id = req.params.id;
   
    TicketComplaintInfo.findByPk(id)
    .then(data =>{
      res.send({
        status: true,
        data : data || "Update info Id no Existing"
      });
    })
    .catch(err =>{
      res.status(500).send({
        status : false,
        message: "Error retrieving Update UD with id=" + id
      })
    })
}

exports.update = (req,res) => {

  const id = req.params.id;

    // Validate Request
    if (!req.body) {
      res.status(400).send({
        status: false,
        message: "Content can not be empty!"
      });
    }

    TicketComplaintInfo.update(req.body,{
    where : {id : id}
  })
  .then(num =>{
    if(num == 1){
      res.send({
        status : true,
        message: "Update Info was updated successfully."
      });
    }else{
      res.send({
        status : false,
        message: `Cannot update Info Ticket with id=${id}. Maybe Update Info was not found or req.body is empty!`
      });
    }
  })
  .catch(err =>{
    res.status(500).send({
      status : false,
      message: "Error updating Update Info with id=" + id
    });
  })

}

exports.delete = (req,res) => {
  
  const id = req.params.id;

  TicketComplaintInfo.destroy({
    where : {id : id}
  })
  .then(num =>{
    if(num == 1){
      res.send({
        status : true,
        message: "Update Info was Deleted successfully."
      });
    }else{
      res.send({
        status : false,
        message: `Cannot delete Update Info with id=${id}. Maybe Update Info was not found!`
      });
    }
  })
  .catch(err =>{
    res.status(500).send({
      status : false,
      message: "Error Deleted Update Info with id=" + id
    });
  })

}

exports.deleteAll = (req, res) => {
    TicketComplaintInfo.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ 
        status : true,
        message: `${nums} Update Info were deleted successfully!` 
      });
    })
    .catch(err => {
      res.status(500).send({
        status:false,
        message:
          err.message || "Some error occurred while removing all Update Info."
      });
    });
};