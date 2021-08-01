
// Ticket Status
var checkStatusResolved = require('./ticket_status/check_resolved_ticket_status');
var checkStatusHandle = require('./ticket_status/check_handle_ticket_status');
var checkStatusUpdate = require('./ticket_status/check_update_ticket_status');
var checkStatusReopen = require('./ticket_status/check_reopen_ticket_status');
var checkStatusClose = require('./ticket_status/check_close_ticket_status');

// Auth Middleware
var verifySignUp = require('./auth/verifySignUp');
const authJwt = require("./auth/authJWT");

module.exports = {
    checkStatusHandle : checkStatusHandle.checkStatusHandle,
    checkStatusResolved : checkStatusResolved.checkStatusResolved,
    checkStatusUpdate : checkStatusUpdate.checkStatusUpdate,
    checkStatusClose : checkStatusClose.checkStatusClose,
    checkStatusReopen : checkStatusReopen.checkStatusReopen,
    checkDuplicateUsernameOrEmail: verifySignUp.checkDuplicateUsernameOrEmail,
    checkRolesExisted : verifySignUp.checkRolesExisted,
    authJwt: authJwt
}