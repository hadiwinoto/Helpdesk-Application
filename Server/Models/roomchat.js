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
      sender: {
        type: Sequelize.STRING
      },
      handler: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.TEXT
      },
      read: {
        type: Sequelize.STRING
      }
    });
    return RoomChat;
};

