import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import initListeners from "./listeners";
import initEventEmitters from "./events";


const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
        origin: "*",
    }
})
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Coimbra Server')
})
server.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})

io.on("connection", (socket) => {
    initListeners(socket);
});
