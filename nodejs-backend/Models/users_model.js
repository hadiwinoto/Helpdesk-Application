module.exports = (Sequelize,connectMysql) => {
    const Users = connectMysql.define("users",{
   
      username : {
          type: Sequelize.STRING,
        primaryKey: true
      },
      fullname : {
        type: Sequelize.STRING
      },
      address : {
        type: Sequelize.STRING
      },
      password : {
        type: Sequelize.STRING
      },
      gender : {
        type: Sequelize.STRING
      },
      email : {
        type: Sequelize.STRING
      },
      mobile_number : {
        type: Sequelize.STRING
      },
      photo_profile : {
        type: Sequelize.STRING
      },
      active : {
        type: Sequelize.STRING
      }
    });

    return Users;
}
