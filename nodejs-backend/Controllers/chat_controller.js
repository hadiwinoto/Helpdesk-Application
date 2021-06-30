const { room_chat_model } = require("../Models");
const db = require("../Models");
const RoomModel = db.room_model;
const RoomChatModel = db.room_chat_model;
const op = db.Sequelize.Op;

exports.ListChat = (req,res) => {

    RoomModel.findAndCountAll({ 
    where : {status:'Open'},
    order: [['createdAt', 'DESC']],
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


exports.CreateRoom = (req, res) => {

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

exports.ChatDetails = (req,res) => {

    // Validate request
    if(!req.body.roomid) {
      res.status(400).send({
        status: false,
        message: "Roomid can not be empty!"
      });
      return;
  }

    room_chat_model.findAndCountAll({ 
    where : {roomid:req.body.roomid},
    order: [['createdAt', 'ASC']],
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


exports.SendChat = (req, res) => {

    // Validate request
    if(!req.body) {
        res.status(400).send({
          status: false,
          message: "Content can not be empty!"
        });
        return;
    }

    RoomModel.findByPk(req.body.roomid)
        .then(data =>{
          
          if(!data){
            return res.status(404).send({
              status : 1,
              data : "Room id Not Found."
            });
          }

          const send = {
            roomid : req.body.roomid,
            complainer_id : data.complainer_id,
            helpdesk_id : data.helpdesk_id,
            message: req.body.message,
            type: req.body.type,
            read: req.body.read,
          };
      
          RoomChatModel.create(send)
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
        
        })
        .catch(err=>{ 
            res.status(500).send({
              status : false,
              message : err.message || "Some error occurred while retrieving List Chats."
        })
    })

};

exports.HandleChat = (req,res) => {

  const roomid = req.body.roomid;
  const helpdesk_id = req.body.helpdesk_id;

    // Validate Request
    if (!req.body) {
      res.status(400).send({
        status: false,
        message: "Content can not be empty!"
      });
    }

    RoomModel.update({helpdesk_id:helpdesk_id},{
      where : {roomid : roomid}
    })
  .then(num =>{
    if(num == 1){
      res.send({
        status : true,
        message: "Handle Chat was updated successfully."
      });
    }else{
      res.send({
        status : false,
        message: `Cannot Handle room with id=${roomid}. Maybe Room was not found or req.body is empty!`
      });
    }
  })
  .catch(err =>{
    res.status(500).send({
      status : false,
      message: "Error updating Update Info with id=" + roomid
    });
  })

}


