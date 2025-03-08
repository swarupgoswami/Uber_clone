const socketIO = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.models");

let io;

function initializeSocket(server) {
  io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      if (userType === "user") {
        const user = await userModel.findById(userId);
        if (user) {
          user.socketId = socket.id;
          await user.save();
          console.log(
            `User with ID ${userId} updated with socket ID ${socket.id}`
          );
        } else {
          console.log("User not found.");
        }
      } else if (userType === "captain") {
        const captain = await captainModel.findById(userId);
        if (captain) {
          captain.socketId = socket.id;
          await captain.save();
          console.log(
            `Captain with ID ${userId} updated with socket ID ${socket.id}`
          );
        } else {
          console.log("Captain not found.");
        }
      }

      console.log(
        `${userType} with ID ${userId} joined with socket ID ${socket.id}`
      );
      // console.log(updatedDocument);
    });
    socket.on('update-location-captain', async (data) => {
        const { userId, location } = data;

        if (!location || !location.ltd || !location.lng) {
            return socket.emit('error', { message: 'Invalid location data' });
        }

        await captainModel.findByIdAndUpdate(userId, {
            location: {
              ltd: location.ltd,
              lng: location.lng
            }
        });
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
}

function sendMessageToSocketId(socketId, messageObject) {
  console.log(`sending message to ${socketId}`,messageObject );
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.error("Socket.io is not initialized.");
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
