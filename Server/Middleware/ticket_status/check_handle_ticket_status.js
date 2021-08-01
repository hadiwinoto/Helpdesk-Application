const db = require("../../Models");
const Ticket = db.ticket_model;

check_handle_ticket_status = (req,res,next) => {

    var id = req.query.ticket_id || res.send({ status: false, message : "ticket id can not be Empty" });

    Ticket.findByPk(id)
    .then(data =>{
        if(data){
          if(data.ticket_status === 'Process'){
            res.status(200).send({
                status: -1,
                message : "Ticket On Process, you are Cannot Handle Again, Until Status Reopen"
            });
            return;
          }else if(data.ticket_status == 'Resolved'){
            res.status(400).send({
                status: false,
                message : "Ticket Have Resolve, you are Cannot Handle Again, Until Status Reopen"
            });
            return;
          }else if(data.ticket_status == 'Update'){
            res.status(400).send({
                status: false,
                message : "Ticket Already Update, you are Cannot Handle Again, Until Status Reopen"
            });
            return;
          }else if(data.ticket_status == 'Close'){
            res.status(400).send({
                status: false,
                message : "Ticket Already Close, you are Cannot Handle Again"
            });
            return;
          }    
         next();
        }
    })
    
}

module.exports = {
    checkStatusHandle : check_handle_ticket_status
}