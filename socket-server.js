const { Server } = require("socket.io");

module.exports = (server) => {
  const io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
    });
  
  io.on('connection', (socket) => {

    socket.on('setName', (fullname) => {
      socket["name"] = fullname;
    });

    socket.on('join_room', (roomId, done) => {
      socket.join(roomId);
      socket.rooms.forEach((room) => {
        socket.to(room).emit('welcome', `${socket.name}`)
      })
      done(roomId);
    })

    socket.on('disconnecting', () => {
      socket.rooms.forEach((room) => {
        socket.to(room).emit('bye', `${socket.name}`)
      })
    })

    socket.on('send_messasge', (message, userId, room) => {
      socket.to(room).emit('receive_messasge', message, userId);
    })

    socket.on("offer", (offer, roomID) => {
      socket.to(roomID).emit("offer", offer);
    })

    socket.on("answer", (answer, roomID) => {
      socket.to(roomID).emit("answer", answer);
    })

    socket.on("ice", (ice, roomID) => {
      socket.to(roomID).emit("ice", ice);
    })

  })
}