module.exports = (Sequelize,connectMysql) => {
    const TicketComplaint = connectMysql.define("complaint_tickets",{

      ticket_id : {
          type: Sequelize.STRING,
          unique: {
            args: true,
            msg: 'Ticket id already Existing!',
        },
        primaryKey: true
      },
      category_complant : {
        type: Sequelize.STRING
      },
      trouble_time : {
        type: Sequelize.STRING
      },
      description_complaint : {
        type: Sequelize.STRING
      },
      address : {
        type: Sequelize.STRING
      },
      title : {
        type: Sequelize.STRING
      },
      msisdn : {
        type: Sequelize.STRING
      },
      ticket_status : {
        type: Sequelize.STRING
      },
      target_troubleshoot : {
        type: Sequelize.STRING
      },
      resolved_time : {
        type: Sequelize.STRING
      },
      close_time : {
        type: Sequelize.STRING
      },
      complainer : {
        type: Sequelize.STRING
      }
      ,
      file_id : {
        type: Sequelize.TEXT                        
      },
      rating : {
        type: Sequelize.STRING
      }, 
      priority : {
        type: Sequelize.STRING
      },
      longitude  : {
        type: Sequelize.STRING
      },
      latitude  : {
        type: Sequelize.STRING
      }
    });

    return TicketComplaint;
}
