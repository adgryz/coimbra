import * as React from 'react';
import { Button } from "@chakra-ui/react";

import { Game } from 'models/games/types';
import socket from 'services/socket';

import styles from './GameRow.module.scss';

interface IGameRowProps {
    game: Game
    playerId: string,
    openModal: () => void,
}

const GameRow = ({ game, playerId, openModal }: IGameRowProps) => {

    const joinGame = () => {
        console.log('Temporary join ', game.id)
        socket.emit('joinGame', { gameId: game.id, playerId })
        openModal();
    }

    return (
        <div className={styles.root}>
            <div className={styles.gameName}>{game.ownerId}'s game</div>
            <div className={styles.rightPart}>
                <div className={styles.playersNames}>
                    {game.playersIds.map(
                        playerId => <div className={styles.playersName} key={playerId}>{playerId}</div>
                    )}
                </div>
                <div>{game.currentPlayersNumber} / {game.playersNumber}</div>
                <Button className={styles.joinButton} colorScheme="teal" onClick={joinGame}>Join</Button>
            </div>
        </div>
    )
}

export default GameRow;