import gamesUpdatedEvent from './gamesUpdated';
import { io } from '../index';

export default {
    gamesUpdated: gamesUpdatedEvent(io)
}