const { Server } = require("socket.io");
const User = require('./models/userModel');


module.exports = (server) => {
    const io = new Server(server, {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"]
        }
      });

      io.on("connection", (socket) => {
        socket.on('online',async (data) => {
            console.log(data);
            try {
               const res =  await User.findByIdAndUpdate(data.id, data);
               console.log(res);
            } catch (err) {
                console.log(err);
            }
        });
      });
}