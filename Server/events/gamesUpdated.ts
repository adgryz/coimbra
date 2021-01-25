import { Server } from 'socket.io';

import { IGame } from '../model';

const gamesUpdated = (io: Server) => (games: IGame[]) => {
    io.emit('gamesUpdated', games)
};

export default gamesUpdated;