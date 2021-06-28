module.exports = (Sequelize, connectMysql) => {
    const RoomChat = connectMysql.define("roomchat", {
      roomid: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      complainer_id: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.TEXT
      },
      helpdesk_id: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      closetime: {
        type: Sequelize.STRING
      }
    });
    return RoomChat;
};

