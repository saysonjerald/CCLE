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

  })
}