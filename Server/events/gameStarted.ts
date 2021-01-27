import { Server } from 'socket.io';

const gameStarted = (io: Server) => () => {
    io.emit('gameStarted')
};

export default gameStarted;