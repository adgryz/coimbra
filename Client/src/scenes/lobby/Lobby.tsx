import * as React from 'react';
import { useRecoilValue } from 'recoil';

import socket from 'services/socket';
import { gamesState } from 'models/games/atoms';
import { playerNicknameState } from 'models/player/atoms';
import { Button, Modal, useDisclosure, ModalContent, ModalOverlay } from "@chakra-ui/react";

import GameRow from './GameRow';
import GameCreationModal from './GameCreationModal';
import GameRoomModal from './GameRoomModal';
import styles from "./Lobby.module.scss";

const Lobby = () => {
    const playerNickname = useRecoilValue(playerNicknameState);
    const games = useRecoilValue(gamesState);
    const { isOpen: isGameCreationOpen, onOpen: onGameCreationOpen, onClose: onGameCreationClose } = useDisclosure()
    const { isOpen: isGameRoomOpen, onOpen: onGameRoomOpen, onClose: onGameRoomClose } = useDisclosure()

    const handleGameRoomClose = () => {
        socket.emit('leaveGame', { playerId: playerNickname });
        onGameRoomClose();
    }

    const playerGame = games.find(game => game.playersIds.includes(playerNickname))

    return (
        <div className={styles.root}>
            <div className={styles.topBar}>
                <div className={styles.greeting}>{playerNickname} welcome to Coimbra!</div>
                <Button colorScheme="orange" onClick={onGameCreationOpen}>Create Game</Button>
            </div>
            <div>
                <p className={styles.title}>Games waiting for start:</p>
                <div>
                    {
                        games.map(game => (
                            <div className={styles.row} key={game.id}>
                                <GameRow
                                    openModal={onGameRoomOpen}
                                    game={game}
                                    playerId={playerNickname} />
                            </div>
                        ))

                    }
                </div>
            </div>
            <Modal isOpen={isGameCreationOpen} onClose={onGameCreationClose}>
                <ModalOverlay />
                <ModalContent>
                    <GameCreationModal closeCreationModal={onGameCreationClose} openGameRoom={onGameRoomOpen} />
                </ModalContent>
            </Modal>
            <Modal isOpen={isGameRoomOpen} onClose={handleGameRoomClose}>
                <ModalOverlay />
                <ModalContent>
                    <GameRoomModal game={playerGame} />
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Lobby