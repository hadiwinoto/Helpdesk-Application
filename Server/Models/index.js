const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const connectMysql = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
    host : dbConfig.HOST,
      dialect : dbConfig.dialect,
      operatorsAliases : false,
      pool : {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
      }

}) 

const db = {};

db.Sequelize = Sequelize;
db.connectMysql = connectMysql;

db.update_info_model = require("./update_info_model.js")(Sequelize,connectMysql);
db.ticket_model = require("./ticket_model.js")(Sequelize,connectMysql);
db.users_model = require("./users_model.js")(Sequelize,connectMysql);
db.roles_model = require("./roles_model.js")(Sequelize,connectMysql);

// Chat 
db.room_model = require("./room.js")(Sequelize,connectMysql);
db.room_chat_model = require("./roomchat.js")(Sequelize,connectMysql);
db.file_chat = require("./filechat.js")(Sequelize,connectMysql);

// Relation Ticket Model To Update Info
db.ticket_model.hasMany(db.update_info_model, { as: "update_info_model",  foreignKey: "ticket_id"});
db.update_info_model.belongsTo(db.ticket_model, { foreignKey: "ticket_id", });

// Relation Ticket Model To handler
db.users_model.hasMany(db.ticket_model, { as: "ticket_model",  foreignKey: "user_handler"});
db.ticket_model.belongsTo(db.users_model, { foreignKey: 'user_handler', });

// Relation Room Model To Roomchat
db.room_model.hasMany(db.room_chat_model, { as: "room_model_chat",  foreignKey: "roomid"});
db.room_chat_model.belongsTo(db.room_model, { foreignKey: 'roomid', });


// Relation Users To Roles
db.roles_model.belongsToMany(db.users_model,{
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "username",
});

db.users_model.belongsToMany(db.roles_model,{
  through: "user_roles",
  foreignKey: "username",
  otherKey: "roleId",
  // as : "roles"
});

db.ROLES = ["admin", "helpdesk","complainer"];

module.exports = db;
