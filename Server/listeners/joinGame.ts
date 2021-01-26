import { Socket } from "socket.io";

import { state } from '../model';
import events from '../events';

type JoinGameInput = {
    playerId: string;
    gameId: string;
}

const joinGame = (socket: Socket) => socket.on('joinGame', ({ playerId, gameId }: JoinGameInput) => {
    console.log('');
    console.log(`Player ${playerId} joins ${gameId}`)
    let { games } = state;
    const gameToJoin = games.find(game => game.id === gameId);
    if (!gameToJoin) {
        return;
    }
    gameToJoin.playersIds.push(playerId)
    gameToJoin.currentPlayersNumber++;

    events.gamesUpdated(games);
})

export default joinGame;