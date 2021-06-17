
// const { response } = require("express");
const db = require("../Models");
const Ticket = db.ticket_model;
const update_info_model = db.update_info_model;
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

    // Create a Ticket
    const ticket = {
        ticket_id : req.body.ticket_id,
        uid : req.body.uid,
        create_time : req.body.create_time,
        update_time : req.body.update_time,
        title : `[${req.body.category_complant}] (${req.body.priority}) - ${req.body.ticket_id}`,
        category_complant : req.body.category_complant,
        trouble_time : req.body.trouble_time,
        description_complaint : req.body.description_complaint,
        address : req.body.address,
        msisdn : req.body.msisdn,
        file_id : req.body.file_id,
        target_troubleshoot : req.body.target_troubleshoot,
        ticket_status : "Open",
        resolved_time : req.body.resolved_time,
        close_time : req.body.close_time,
        priority: req.body.priority,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
    };

    Ticket.create(ticket)
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
  
};

exports.getList = (req,res) => {

  const { page, size, ticket_id,ticket_status,user_handler} = req.query;

  var ticketid = ticket_id ? `${ticket_id}` : null;
  var userHandler = user_handler ? `${user_handler}` : null;
  var ticketStatus = ticket_status ? `${ticket_status}` : null;

  var condition = {}
  ticketid ? condition['ticket_id'] = {[op.like] : `%${ticketid}%`} : '';
  ticketStatus ? condition['ticket_status'] = ticketStatus : '';
  userHandler ? condition['user_handler'] = userHandler : '';
  condition == null? condition : null

  const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
    
    return { limit, offset };
  };

  const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows:  tickets} = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, tickets, totalPages, currentPage };
  };  

  const { limit, offset } = getPagination(page, size);
  
  Ticket.findAndCountAll({ where : condition, limit, offset,
  order: [['trouble_time', 'DESC']],
    // include: ["update_info_model"]
  })
    .then(data =>{
      const response = getPagingData(data, page, limit);
      res.send({
        status : 1,
        data : response
      });
    })
    .catch(err=>{ 
        res.status(500).send({
          status : false,
          message : err.message || "Some error occurred while retrieving tutorials."
        })
    })

}

exports.get = (req,res) => {
    var id = req.params.ticket_id;
   
    Ticket.findByPk(id,{include: ["update_info_model"]})
    .then(data =>{
      if(data){
        res.send({
          status: 1,
          data : data
        });
      }else{
        res.send({
          status: -1,
          message : 'Ticket Not Found'
        });
      }
    })
    .catch(err =>{
      res.status(500).send({
        status : -1,
        message: "Error retrieving Ticket with id=" + id
      })
    })
}

exports.update = (req,res) => {

  const id = req.params.ticket_id;

    // Validate Request
    if (!req.body) {
      res.status(400).send({
        status: false,
        message: "Content can not be empty!"
      });
    }

  Ticket.update(req.body,{
    where : {id : id}
  })
  .then(num =>{
    if(num == 1){
      res.send({
        status : true,
        message: "Ticket was updated successfully."
      });
    }else{
      res.send({
        status : false,
        message: `Cannot update Ticket with id=${id}. Maybe Ticket was not found or req.body is empty!`
      });
    }
  })
  .catch(err =>{
    res.status(500).send({
      status : false,
      message: "Error updating Ticket with id=" + id
    });
  })

}

exports.delete = (req,res) => {
  
  const id = req.params.ticket_id;

  Ticket.destroy({
    where : {ticket_id : id}
  })
  .then(num =>{
    if(num == 1){
      res.send({
        status : true,
        message: "Ticket was Deleted successfully."
      });
    }else{
      res.send({
        status : false,
        message: `Cannot delete Ticket with id=${id}. Maybe Ticket was not found!`
      });
    }
  })
  .catch(err =>{
    res.status(500).send({
      status : false,
      message: "Error Deleted Ticket with id=" + id
    });
  })

}

exports.deleteAll = (req, res) => {
  Ticket.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ 
        status : true,
        message: `${nums} Ticket were deleted successfully!` 
      });
    })
    .catch(err => {
      res.status(500).send({
        status:-1,
        message:
          err.message || "Some error occurred while removing all Ticket."
      });
    });
};