const db = require("../../Models");
const Ticket = db.ticket_model;

check_reopen_ticket_status = (req,res,next) => {

    var id = req.query.ticket_id || res.send({ status: false, message : "ticket id can not be Empty" });

    Ticket.findByPk(id)
    .then(data =>{
        if(data){
          if(data.ticket_status === 'Process'){
            res.status(400).send({
                status: false,
                message : "Ticket On Process, you are Cannot Reopen, Until Status Resolved"
            });
            return;
          }else if(data.ticket_status == 'Open'){
            res.status(400).send({
                status: false,
                message : "Ticket Status Still Open, you are Cannot Reopen, Until Status Resolved"
            });
            return;
          }else if(data.ticket_status == 'Update'){
            res.status(400).send({
                status: false,
                message : "Ticket Status Update, you are Cannot Reopen, Until Status Resolved"
            });
            return;
          }else if(data.ticket_status == 'Close'){
            res.status(400).send({
                status: false,
                message : "Ticket Already Close, you are Cannot Reopen Again"
            });
            return;
          }    
         next();
        }
    })
    
}

module.exports = {
    checkStatusReopen : check_reopen_ticket_status
}