module.exports = (Sequelize, connectMysql) => {
    const Room = connectMysql.define("room", {
      roomid: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      complainer_id: {
        type: Sequelize.STRING
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
    return Room;
};
