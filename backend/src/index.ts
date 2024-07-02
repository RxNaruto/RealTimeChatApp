import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {join } from "path";

const app = express();
const server = createServer(app);
const io = new Server(server);
const _dirname = __dirname;
app.use(express.static(join(_dirname, "../public")));

app.get("/",(req,res)=>{
    res.sendFile(join(_dirname, "../public/index.html"));
});

io.on('connection',(socket)=>{
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
});

server.listen(3000);