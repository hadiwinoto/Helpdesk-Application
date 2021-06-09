
module.exports = (Sequelize,connectMysql) => {
    const TicketComplaintInfo = connectMysql.define("ticket_complaint_info",{

     user_handler : {
        type: Sequelize.STRING
      },
      update_info : {
        type: Sequelize.STRING
      },
      description_info : {
        type: Sequelize.STRING
      },
      file_id : {
        type: Sequelize.STRING
      },
      
    });

    return TicketComplaintInfo;
}
    