module.exports = function (app) {
    
    const process_ticket_route = require("../Controllers/process_ticket_route.js");
    const checkStatus = require("../Middleware");

    var router = require("express").Router();
    
    // Handle Ticket
    router.post("/handle", checkStatus.checkStatusHandle,process_ticket_route.handleTicket);
    
    // Update Ticket
    router.post("/update",checkStatus.checkStatusUpdate,process_ticket_route.handleTicketUpdate);
    
    // Resolved Ticket
    router.post("/resolved", checkStatus.checkStatusResolved,process_ticket_route.handleTicketResolved);

    // Resolved Ticket
    router.post("/close",checkStatus.checkStatusClose,process_ticket_route.handleTicketClose);

    // Re-Open Ticket
    router.post("/reopen",checkStatus.checkStatusReopen,process_ticket_route.handleTicketReopen);

    
    app.use('/api/handle-ticket', checkStatus.authJwt.verifyToken,router);
  }; 