import * as React from 'react';
import { useRecoilValue } from 'recoil';

import socket from 'services/socket';
import { gamesState } from 'models/games/atoms';
import { playerNicknameState } from 'models/player/atoms';
import { Button, Modal, useDisclosure, ModalContent, ModalOverlay } from "@chakra-ui/react";

import GameRow from './GameRow';
import GameCreationModal from './GameCreationModal';
import styles from "./Lobby.module.scss";

const Lobby = () => {
    const playerNickname = useRecoilValue(playerNicknameState);
    const games = useRecoilValue(gamesState);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onModalClose = () => {
        socket.emit('leaveGame', { playerId: playerNickname });
        onClose();
    }

    return (
        <div className={styles.root}>
            <div className={styles.topBar}>
                <div className={styles.greeting}>{playerNickname} welcome to Coimbra!</div>
                <Button colorScheme="orange" onClick={onOpen}>Create Game</Button>
            </div>
            <div>
                <p className={styles.title}>Games waiting for start:</p>
                <div>
                    {
                        games.map(game => (
                            <div className={styles.row} key={game.id}>
                                <GameRow
                                    openModal={onOpen}
                                    game={game}
                                    playerId={playerNickname} />
                            </div>
                        ))

                    }
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={onModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <GameCreationModal />
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Lobby