
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
        
        socket.on("SendChat",(res)=>{
          
          socket.emit("SendBackChat",res)

          POST("chat/send",res).then(res=>{
            socket.emit("SendSuccess",JSON.parse(res.body))
          })

        })
        
        console.log("New client connected");

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

function POST(path,params){
  const promise = new Promise((resolve,reject)=>{
    request.post(`${URL}/api/${path}`,{form:params}, function (error, response, body) {
      if(!error){ 
        resolve(response)
      }else{
        reject(err)
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