const { Server } = require("socket.io");


module.exports = (server) => {
    const io = new Server(server, {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"]
        }
      });

      io.on("connection", (socket) => {
        // ...
      });
}