
const { response } = require("express");
const db = require("../Models");
const TicketComplaintInfo = db.update_info_model;
const dateFormat = require("dateformat");
const Ticket = db.ticket_model;
const op = db.Sequelize.Op;
const now = new Date();


exports.handleTicket = (req, res) => {
    
    var id = req.query.ticket_id || res.send({ status: false, message : "ticket id can not be Empty" });
    console.log(req.body)
    Ticket.update({ticket_status : "Process",
                  target_troubleshoot : req.body.target_troubleshoot,
                  user_handler: req.body.user_handler
                },{
        where : {ticket_id : id}
      })
      .then(num =>{
        if(num == 1){

            const sendInfo = {
                ticket_id : id,
                user_handler: req.body.user_handler,
                file_id : req.body.file_id,
                update_info : req.body.update_info,
                description_info : req.body.description_info
            }

            TicketComplaintInfo.create(sendInfo)
            .then(data => {
                res.status(200).send({
                  status : 1,
                  status_ticket : "Process" ,
                  update_info : sendInfo
                });
            })
            .catch(err => {
                res.status(500).send({
                  status: -1,
                  message : err.message ||  "Error Send Update Info Ticket"
                });
            });
          
        }else{
          res.send({
            status : -1,
            message: `Cannot Handle Ticket with Ticket id=${id}. Maybe Ticket was not found or req.body is empty!`
          });
        }
      })
      .catch(err =>{
        res.status(500).send({
          status : -1,
          message: "Error Handle Ticket with id=" + id
        });
      })

};
exports.handleTicketUpdate = (req, res) => {
    
  var id = req.query.ticket_id || res.send({ status: false, message : "ticket id can not be Empty" });

  // Validate request
  if(!req.body) {
      res.status(400).send({
        status: false,
        message: "Content can not be empty!"
      });
      return;
  }

  Ticket.update({ticket_status : "Update"},{
      where : {ticket_id : id}
    })
    .then(num =>{
      if(num == 1){

          const sendInfo = {
              ticket_id : id,
              file_id : req.body.file_id,
              update_info : req.body.update_info,
              user_handler : req.body.user_handler || null,
              description_info : req.body.description_info
          }

          TicketComplaintInfo.create(sendInfo)
          .then(data => {
              res.send({
                status : true,
                status_ticket : "Update" ,
                update_info : sendInfo
              });
          })
          .catch(err => {
              res.status(500).send({
                status: false,
                message : err.message ||  "Error Send Update Info Ticket"
              });
          });
        
      }else{
        res.send({
          status : false,
          message: `Cannot Update Ticket info with Ticket id=${id}. Maybe Ticket was not found or req.body is empty!`
        });
      }
    })
    .catch(err =>{
      res.status(500).send({
        status : false,
        message: "Error Update Ticket  info with id=" + id
      });
    })
};
exports.handleTicketResolved = (req, res) => {
    
    var id = req.query.ticket_id || res.send({ status: false, message : "ticket id can not be Empty" });

    // Validate request
    if(!req.body) {
        res.status(400).send({
          status: false,
          message: "Content can not be empty!"
        });
        return;
    }

    Ticket.update(
        {  
            ticket_status : "Resolved", 
            resolved_time: dateFormat(now,"isoUtcDateTime"),

        },
        { where : {ticket_id : id}
      })
      .then(num =>{
        if(num == 1){

            const sendInfo = {
                ticket_id : id,
                user_handler : req.body.user_handler || null,
                file_id : req.body.file_id,
                update_info : req.body.update_info,
                description_info : req.body.description_info
            }

            TicketComplaintInfo.create(sendInfo)
            .then(data => {
                res.send({
                  status : true,
                  status_ticket : "Resolved" ,
                  update_info : sendInfo
                });
            })
            .catch(err => {
                res.status(500).send({
                  status: false,
                  message : err.message ||  "Error Send Resolved Info Ticket"
                });
            });
          
        }else{
          res.send({
            status : false,
            message: `Cannot Resolved Ticket info with Ticket id=${id}. Maybe Ticket was not found or req.body is empty!`
          });
        }
      })
      .catch(err =>{
        res.status(500).send({
          status : false,
          message: "Error Resolved Ticket info with id=" + id
        });
      })
};
exports.handleTicketClose = (req, res) => {
    
  var id = req.query.ticket_id || res.send({ status: false, message : "ticket id can not be Empty" });

  // Validate request
  if(!req.body) {
      res.status(400).send({
        status: false,
        message: "Content can not be empty!"
      });
      return;
  }
  

  Ticket.update(
                {ticket_status : "Close", 
                 close_time: dateFormat(now,"isoUtcDateTime"),
                 rating : req.body.rating
                },{
      where : {ticket_id : id}
    })
    .then(num =>{
      if(num == 1){

          const sendInfo = {
              ticket_id : id,
              user_handler : req.body.user_handler || null,
              update_info : req.body.update_info,
              description_info : req.body.description_info
          }

          TicketComplaintInfo.create(sendInfo)
          .then(data => {
              res.send({
                status : true,
                status_ticket : "Close" ,
                update_info : sendInfo
              });
          })
          .catch(err => {
              res.status(500).send({
                status: false,
                message : err.message ||  "Error Close Info Ticket"
              });
          });
        
      }else{
        res.send({
          status : false,
          message: `Cannot Close Ticket info with Ticket id=${id}. Maybe Ticket was not found or req.body is empty!`
        });
      }
    })
    .catch(err =>{
      res.status(500).send({
        status : false,
        message: "Error Close Ticket info with id=" + id
      });
    })
};
exports.handleTicketReopen = (req, res) => {
    
  var id = req.query.ticket_id || res.send({ status: false, message : "ticket id can not be Empty" });

  // Validate request
  if(!req.body) {
      res.status(400).send({
        status: false,
        message: "Content can not be empty!"
      });
      return;
  }
  

  Ticket.update(
                {ticket_status : "Open"
                },{
      where : {ticket_id : id}
    })
    .then(num =>{
      if(num == 1){

          const sendInfo = {
              ticket_id : id,
              uid : req.body.uid || null,
              file_id : req.body.file_id,
              update_info : req.body.update_info,
              description_info : req.body.description_info
          }

          TicketComplaintInfo.create(sendInfo)
          .then(data => {
              res.send({
                status : true,
                status_ticket : "Open" ,
                update_info : sendInfo
              });
          })
          .catch(err => {
              res.status(500).send({
                status: false,
                message : err.message ||  "Error Reopen Ticket"
              });
          });
        
      }else{
        res.send({
          status : false,
          message: `Cannot Reopen Ticket info with Ticket id=${id}. Maybe Ticket was not found or req.body is empty!`
        });
      }
    })
    .catch(err =>{
      res.status(500).send({
        status : false,
        message: "Error Reopen Ticket info with id=" + id
      });
    })
};