const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("../chatzak_be/routes/userRoutes");
const messagesRoute = require("../chatzak_be/routes/messagesRoutes");
const socket = require("socket.io");
const app = express();
require("dotenv").config();

const corsOptions = {
  origin:'https://chatzak.netlify.app'
}

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", userRoute);
app.use("/api/messages", messagesRoute);


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection succesfully!");
  })
  .catch((e) => {
    console.log("Error", e);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port:${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "https://chatzak.netlify.app",
    credentials: true,
  },
});


const onlineUsers = new Map();
const users = new Map();

io.on("connection", (socket) => {

  socket.on("add-user", (newUserId) => {
    onlineUsers.set(newUserId, socket.id);
    users.set(socket.id, newUserId);
    io.emit("update-users", Object.fromEntries(users));
  });

  socket.on("disconnect", () => {
    users.delete(socket.id);
    io.emit('update-users',  Object.fromEntries(users));
    
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data);
    }
  });
  socket.on("edit-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-edited", data.message);
    }
  });
});



