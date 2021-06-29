module.exports = (Sequelize, connectMysql) => {
    const FileChat = connectMysql.define("filechat", {
      fileid: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      base64: {
        type: Sequelize.TEXT
      },
      filename: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
    });
    return FileChat;
};

