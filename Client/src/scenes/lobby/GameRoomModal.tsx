import * as React from 'react';
import { Button } from "@chakra-ui/react";
import { useRecoilValue } from 'recoil';

import socket from 'services/socket';
import { playerNicknameState } from 'models/player/atoms';
import { Game } from 'models/games/types';

import styles from './GameRoomModal.module.scss';

interface IProps {
    game: Game;
}

const GameRoomModal = ({ game }: IProps) => {
    const playerNickname = useRecoilValue(playerNicknameState);

    const startGame = () => {
        socket.emit('startGame', { gameId: game.id });
    }

    if (!game) {
        return <div></div>
    }

    const isFullGame = game.playersNumber === game.currentPlayersNumber;
    const isOwner = game.ownerId === playerNickname;
    return (
        <div className={styles.root}>
            <div>Waiting for game to start</div>
            <div>Players count: {game.currentPlayersNumber} / {game.playersNumber}</div>
            <div>Players: {game.playersIds}</div>
            {
                isOwner && <Button
                    disabled={!isFullGame}
                    colorScheme="orange"
                    onClick={startGame}>
                    Start Game
            </Button>
            }
        </div>
    )
}

export default GameRoomModal;