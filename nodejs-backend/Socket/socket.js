
const { URL,CLIENT } = require('./config');
const request = require('request');

module.exports = server => {

    const io = require("socket.io")(server,{
        cors: {
          origin: CLIENT,
          methods: ["GET", "POST"]
        }
      });
      
      io.on("connection", (socket) => {
        
        //Show Chat
        socket.on("ShowChat",(id)=>{
          GET('chat/send',{roomid:id}).then(res=>{
            socket.emit("ShowChat",JSON.parse(res.body))
          })
        })

        ListChat();

        console.log("New client connected");

        function ListChat(){
          // List Chat
          GET('chat').then(res=>{
            socket.emit("ListChat",JSON.parse(res.body))
          })
        }
      
        socket.on("disconnect", () => {
          
          console.log("Client disconnected");
          
        });
      });
};

function GET(path,params){
  const promise = new Promise((resolve,reject)=>{
    request(`${URL}/api/${path}`,{form:params}, function (error, response, body) {
      if(!error){
        resolve(response)
      }else{
        reject(error)
      }
    });
  })
  
  return promise;
}

function PUT(path,params){
  const promise = new Promise((resolve,reject)=>{
    request.put(`${URL}/api/${path}`,{form:params}, function (error, response, body) {
      if(!error){ 
        resolve(response)
      }else{
        reject(err)
      }
    });
  })
  
  return promise;
}