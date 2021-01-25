import { Socket } from "socket.io";

import { state } from '../model';
import events from '../events';

type CreateGameInput = {
    playerId: string;
}

const createGame = (socket: Socket) => {
    let { games } = state;

    socket.on('createGame', ({ playerId }: CreateGameInput) => {
        console.log('');
        console.log(`New game is created by ${playerId}`);
        games.push({
            ownerId: playerId,
            playersIds: [playerId],
            id: new Date().getTime().toString(),
        })

        events.gamesUpdated(games);
    })
}

export default createGame;