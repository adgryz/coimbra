import * as React from 'react';

import { Game } from 'models/games/types';
import socket from 'services/socket';

interface IGameRowProps {
    game: Game
    playerId: string,
}

const GameRow = ({ game, playerId }: IGameRowProps) => {

    const joinGame = () => {
        console.log('Temporary join ', game.id)
        socket.emit('joinGame', { gameId: game.id, playerId })
    }

    return (
        <div>
            <div>Game {game.id}</div>
            <div>Players: {game.playersIds}</div>
            <button onClick={joinGame}>Join</button>
        </div>
    )
}

export default GameRow;