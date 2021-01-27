import gamesUpdatedEvent from './gamesUpdated';
import gameStartedEvent from './gameStarted';

import { io } from '../index';

export default {
    gamesUpdated: gamesUpdatedEvent(io),
    gameStarted: gameStartedEvent(io)
}