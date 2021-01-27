import * as React from 'react';
import { Button } from "@chakra-ui/react";
import { useRecoilValue } from 'recoil';

import socket from 'services/socket';
import { playerNicknameState } from 'models/player/atoms';

import styles from './GameCreationModal.module.scss';

const playersNumbers = [2, 3, 4]

interface IGameCreationModalProps {
    openGameRoom: () => void;
    closeCreationModal: () => void;
}

const GameCreationModal = ({ closeCreationModal, openGameRoom }: IGameCreationModalProps) => {
    const playerNickname = useRecoilValue(playerNicknameState);
    const [playersNumber, setPlayersNumber] = React.useState<number>();

    const createGame = () => {
        closeCreationModal();
        openGameRoom();
        socket.emit('createGame', { playerId: playerNickname, playersNumber });
    }

    return (
        <div className={styles.root}>
            <div className={styles.header}>Select number of players</div>
            <div className={styles.numberButtons}>
                {playersNumbers.map(num => (
                    <Button
                        key={num}
                        className={styles.numberButton}
                        colorScheme={playersNumber === num ? 'orange' : 'teal'}
                        onClick={() => setPlayersNumber(num)}>
                        {num}
                    </Button>
                ))}
            </div>
            <Button
                disabled={!playersNumber}
                className={styles.createButton}
                colorScheme="orange"
                onClick={createGame}>
                Create Game
            </Button>
        </div>
    )
}

export default GameCreationModal;