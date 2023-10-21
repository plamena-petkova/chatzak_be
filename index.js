const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('../chatzak_be/routes/userRoutes');
const messagesRoute = require('../chatzak_be/routes/messagesRoutes');
const socket = require("socket.io");
const app = express();
require('dotenv').config();


app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoute);
app.use('/api/messages', messagesRoute);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB connection succesfully!')
}).catch((e) => {
    console.log('Error', e);
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port:${process.env.PORT}`)
});

const io = socket(server, {
    cors:{
        origin:"http://localhost:3000",
        credentials: true,
    }
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId , socket.id)
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data.message);
        }
    });
    socket.on("edit-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-edited", data.message);
        }
    });

});

