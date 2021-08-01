const db = require("../../Models");
const Ticket = db.ticket_model;

check_resolved_ticket_status = (req,res,next) => {

    var id = req.query.ticket_id || res.send({ status: false, message : "ticket id can not be Empty" });

    Ticket.findByPk(id)
    .then(data =>{
        if(data){
          if(data.ticket_status === 'Resolved'){
            res.status(400).send({
                status: false,
                message : "Ticket Have Resolved, you are Cannot Resolved Again, Until Status Update / Process"
            });
            return;
          }else if(data.ticket_status === 'Open'){
                res.status(400).send({
                    status: false,
                    message : "Ticket Still not Handle , you are Cannot Resolve Ticket, Until Status Process and Update"
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
    checkStatusResolved : check_resolved_ticket_status
}