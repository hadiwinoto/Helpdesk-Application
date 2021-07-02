module.exports = server => {

    const io = require("socket.io")(server,{
        cors: {
          origin: "http://localhost:8000",
          methods: ["GET", "POST"]
        }
      });
      
      let interval;
      
      io.on("connection", (socket) => {
      
        console.log("New client connected");
      
        if (interval) {
          clearInterval(interval);
        }
      
        interval = setInterval(() => getApiAndEmit(socket), 1000);
        
        socket.on("disconnect", () => {
          console.log("Client disconnected");
          clearInterval(interval);
        });
      
      });
      
      const getApiAndEmit = socket =>{
        const response = new Date();
        socket.emit("FromAPI",response)
      }
};