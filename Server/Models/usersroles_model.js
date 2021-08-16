module.exports = (Sequelize, connectMysql) => {
  const user_roles = connectMysql.define("user_roles", {
    roleId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING
    }
  });
  return user_roles;
};