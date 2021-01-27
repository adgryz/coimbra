import * as React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { useHistory } from "react-router-dom";

import { currentGameState, gamesState } from 'models/games/atoms'
import { playerNicknameState } from 'models/player/atoms';
import { Game } from 'models/games/types';
import socket from 'services/socket';

const SocketListener = () => {
    const [games, setGames] = useRecoilState(gamesState);
    const [currentGame, setCurrentGame] = useRecoilState(currentGameState);
    const playerNickname = useRecoilValue(playerNicknameState);

    const history = useHistory();

    React.useEffect(() => {
        socket.on('gamesUpdated', (games: Game[]) => {
            setGames(games);
        })
    }, []);

    const startGame = () => {
        const playersGame = games.find(game => game.playersIds.includes(playerNickname))
        console.log(games, playerNickname, playersGame);
        setCurrentGame(playersGame);
        history.push("/board");
    }

    React.useEffect(() => {
        socket.on('gameStarted', () => startGame())
    }, [startGame])

    return (
        <div />
    )
}

export default SocketListener;