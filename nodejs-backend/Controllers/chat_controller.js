const db = require("../Models");
const RoomModel = db.room_model;
const op = db.Sequelize.Op;

exports.getList = (req,res) => {

    RoomModel.findAndCountAll({ 
    // where : ,
    order: [['createdAt', 'DESC']],
    // attributes: {exclude:excludes}
    })
      .then(data =>{
        res.send({
          status : 1,
          data : data
        });
      })
      .catch(err=>{ 
          res.status(500).send({
            status : false,
            message : err.message || "Some error occurred while retrieving List Chats."
          })
      })
  
  }

  
exports.create = (req, res) => {

    // Validate request
    if(!req.body) {
        res.status(400).send({
          status: false,
          message: "Content can not be empty!"
        });
        return;
    }

    const room = {
        roomid : req.body.roomid,
        complainer_id : req.body.complainer_id,
        helpdesk_id : req.body.helpdesk_id,
        status: req.body.status,
        closetime: req.body.closetime,
    };

    RoomModel.create(room)
    .then(data => {
        res.send({
          status : true,
          data : data
        });
    })
    .catch(err => {
        res.status(500).send({
          status: false,
          message : err.message ||  "Some error occurred while creating the Rooms."
        });
    });
  
};
