import { Socket } from "socket.io";

import { state } from '../model';
import events from '../events';

type CreateGameInput = {
    playerId: string;
    playersNumber: number;
}

const createGame = (socket: Socket) => {
    let { games } = state;

    socket.on('createGame', ({ playerId, playersNumber }: CreateGameInput) => {
        console.log('');
        console.log(`New game is created by ${playerId}`);
        games.push({
            ownerId: playerId,
            playersIds: [playerId],
            id: new Date().getTime().toString(),
            playersNumber,
            currentPlayersNumber: 1,
        })

        events.gamesUpdated(games);
    })
}

export default createGame;