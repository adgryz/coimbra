import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
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

interface Game {
    ownerId: string;
    playersIds: string[];
    id: string;
}

type CreateGameInput = {
    playerId: string;
}

type JoinGameInput = {
    playerId: string;
    gameId: string;
}

type LeaveGameInput = {
    playerId: string;
}

let games: Game[] = [];


io.on('connection', (socket: Socket) => {
    console.log('A user just connected');

    socket.on('createGame', ({ playerId }: CreateGameInput) => {
        console.log(`Game created by ${playerId}`);
        games.push({
            ownerId: playerId,
            playersIds: [playerId],
            id: new Date().getTime().toString(),
        })
        io.emit('gamesUpdated', games);
    })

    socket.on('joinGame', ({ playerId, gameId }: JoinGameInput) => {
        const gameToJoin = games.find(game => game.id === gameId);
        gameToJoin?.playersIds.push(playerId)
        io.emit('gamesUpdated', games);
    })

    socket.on('leaveGame', ({ playerId }: LeaveGameInput) => {
        const gameToLeave = games.find(game => game.playersIds.find(id => id === playerId));
        if (!gameToLeave) {
            return;
        }
        gameToLeave.playersIds = gameToLeave?.playersIds.filter(id => id !== playerId);

        console.log(playerId, gameToLeave.ownerId)
        if (gameToLeave.playersIds.length === 0) { // Remove empty game
            games = games.filter(game => game.id !== gameToLeave.id);
            console.log('empty game', games)
        } else if (playerId === gameToLeave.ownerId) { // If owner left setup new owner
            console.log('owner leaving', games)
            gameToLeave.ownerId = gameToLeave.playersIds[0];
        }

        io.emit('gamesUpdated', games);
    })

    socket.on('disconnect', () => {
        console.log('A user has disconnected')
    })
})