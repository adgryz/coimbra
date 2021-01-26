import { Socket } from "socket.io";

import { state } from '../model';
import events from '../events';

type LeaveGameInput = {
    playerId: string;
}

const leaveGame = (socket: Socket) => socket.on('leaveGame', ({ playerId }: LeaveGameInput) => {
    console.log('');
    console.log(`${playerId} leaves the game`);
    let { games } = state;
    const gameToLeave = games.find(game => game.playersIds.find(id => id === playerId));
    if (!gameToLeave) {
        return;
    }
    gameToLeave.playersIds = gameToLeave?.playersIds.filter(id => id !== playerId);
    gameToLeave.currentPlayersNumber--;

    if (gameToLeave.playersIds.length === 0) { // Remove empty game
        games = games.filter(game => game.id !== gameToLeave.id);
        console.log('Game is removed');
    } else if (playerId === gameToLeave.ownerId) { // If owner left setup new owner
        gameToLeave.ownerId = gameToLeave.playersIds[0];
        console.log(`New owner of the game is ${gameToLeave.ownerId}`);
    }

    events.gamesUpdated(games);
});

export default leaveGame;
