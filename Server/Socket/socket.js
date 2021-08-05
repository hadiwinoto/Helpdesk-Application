
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

          try{
            socket.emit("SendBackChat",res)
            
            POST("chat/send",res).then(res=>{
  
              let responses = res.body;
              if(JSON.parse(responses).status){
                socket.broadcast.emit("SendSuccess",JSON.parse(res.body))
                socket.broadcast.emit("beep",true)
                
                socket.emit("SendSuccess",JSON.parse(res.body))
                
              }else{
                socket.emit("FailedSend",false)
              }
            })
            
          }catch{
            socket.emit("FailedSend",false)
          }
          
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

    request.post(`${URL}/api/${path.trim()}`,{form:params}, function (error, response, body) {
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