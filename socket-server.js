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

    socket.on('join_room', (roomId, userId, done) => {
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
      socket.broadcast.to(room).emit('receive_messasge', message, userId);
    })

    socket.on("join-user", (roomId) => {
      socket.to(roomId).emit('user-connected', roomId);
    });

    socket.on('sendID', (id, roomId) => {
      socket.broadcast.to(roomId).emit('receiveId',id );
    });

    socket.on('leave-room', (id) => {
      socket.leave(id);
    })

    socket.on('hidePeerFace', (roomId, userId, value) => {
      socket.to(roomId).emit('hidePeerFace', userId, value );
    });

  })
}