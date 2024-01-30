// Server
const http = require("http").createServer();
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

const activeRooms = new Map(); // (roomId : var=> nPeople & theyr ID)

const PlayerCoordinates = new Map(); //(playerID:var => latitude & longitude)

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  socket.on("coordinates", (id , cords ) => {
    let playerID = id;
    let latitude = cords.latitude;
    let longitude = cords.longitude;
    const roomID = (playerID) =>  {
      const socketz = io.sockets.sockets.get(playerID);
      if (socketz) {
        console.log(Array.from(socketz.rooms)[1]);
        return Array.from(socketz.rooms)[1];
      }
      return "";
    }
    console.log(playerID)
    PlayerCoordinates.set(playerID, { latitude, longitude });
    console.log("Map" , Array.from(PlayerCoordinates))
    io.to(roomID(playerID)).emit("playersCoordinates", Array.from(PlayerCoordinates));
  });

  socket.on("uptRoom", () => {
    const roomId = Array.from(socket.rooms)[1];
    if (roomId) {
      const roomData = activeRooms.get(roomId);
      io.to(roomId).emit("updateRoom", roomData , roomId);
    }
  });
  
  
  socket.on("createRoom", (cb) => {
    const roomId = Math.random().toString(36).substring(2, 7);
    activeRooms.set(roomId, {
      nPeople: 1,
      socketIds: [socket.id],
    });
    console.log(activeRooms);
    socket.join(roomId);
    cb(true);
    io.to(roomId).emit("updateRoom", activeRooms.get(roomId), roomId);
  });

  socket.on("joinRoom", (roomId, cb) => {
    if (!activeRooms.has(roomId)) {
      activeRooms.set(roomId, {
        nPeople: 1,
        socketIds: [socket.id],
      });
    } else {
      activeRooms.get(roomId).nPeople += 1;
      activeRooms.get(roomId).socketIds.push(socket.id);
      socket.to(activeRooms.get(roomId).socketIds[0]).emit("isLeader");
    }

    socket.join(roomId);

    io.to(roomId).emit("updateRoom", activeRooms.get(roomId), roomId);

    console.log(activeRooms);
    cb(`joined room -> ${activeRooms}`);
  });

  socket.on("disconnect", () => {
    PlayerCoordinates.delete(socket.id);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected with ID: ${socket.id}`);
    activeRooms.forEach((room) => {
      const index = room.socketIds.indexOf(socket.id);
      if (index !== -1) {
        room.socketIds.splice(index, 1);
        room.count -= 1;
      }
    });
    console.log(activeRooms);
  });
  socket.on("startGameServer", (roomId) => {
    io.to(roomId).emit("startGame", "");
    console.log("Start Game");
  });
});

http.listen(8080, () => console.log("listening"));
