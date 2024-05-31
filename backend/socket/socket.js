import {Server} from 'socket.io';
import http from 'http';
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin:['http://localhost:3000'],
        methods:['GET', 'POST']
    }
});

export const getReceiverSocketId = (receiverId) => {
    return rooms[receiverId].roomId;
};

const userSocketMap = {};
const rooms = {};

io.on('connection', (socket) => {
    console.log('user connected', socket.id);

    const userId = socket.handshake.query.userId;
    if(userId !== 'undefined') userSocketMap[userId] = socket.id;

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);

        rooms[roomId] = rooms[roomId] || {roomId: roomId, users: []};
        rooms[roomId].users.push(socket.id)

        io.to(roomId).emit('roomUpdated', rooms[roomId])
    })

    socket.on('leaveRoom', (roomId) => {
        socket.leave(roomId);

        rooms[roomId].users = rooms[roomId].users.filter((userId) => userId !== socket.id);
        io.to(roomId).emit('roomUpdated', rooms[roomId]);
    });

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));

    });
});

export {app, io, server};