module.exports = (Sequelize, connectMysql) => {
    const RoomChat = connectMysql.define("roomchat", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      roomid: {
        type: Sequelize.STRING
      },
      complainer_id: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.TEXT
      },
      helpdesk_id: {
        type: Sequelize.STRING
      },
      read: {
        type: Sequelize.STRING
      },
      closetime: {
        type: Sequelize.STRING
      }
    });
    return RoomChat;
};

