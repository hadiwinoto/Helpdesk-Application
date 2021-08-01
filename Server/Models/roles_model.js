module.exports = (Sequelize, connectMysql) => {
    const Role = connectMysql.define("roles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
    return Role;
};