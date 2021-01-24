import * as React from 'react';
import { useRecoilValue } from 'recoil';

import socket from 'services/socket';
import { gamesState } from 'models/games/atoms';
import { playerNicknameState } from 'models/player/atoms';

import GameRow from './GameRow';

const createGame = (playerId: string) => {
    socket.emit('createGame', { playerId });
}

const Lobby = () => {
    const playerNickname = useRecoilValue(playerNicknameState);
    const games = useRecoilValue(gamesState);

    return (
        <div>
            <div>{playerNickname} welcome to Coimbra!</div>
            <button onClick={() => createGame(playerNickname)}>Create Game</button>
            <div>
                <p>Games</p>
                <div>
                    {
                        games.map(game => <GameRow game={game} playerId={playerNickname} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Lobby