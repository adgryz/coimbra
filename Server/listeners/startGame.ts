import { Socket } from "socket.io";

import { state } from '../model';
import events from '../events';

type StartGameInput = {
    gameId: string;
}

const startGame = (socket: Socket) => {
    let { games } = state;

    socket.on('startGame', ({ gameId }: StartGameInput) => {
        console.log('');
        console.log(`Game  ${gameId} has started`);
        games.find(game => game.id === gameId)!.isInProgress === true;
        events.gamesUpdated(games);
        events.gameStarted();
    })
}

export default startGame;