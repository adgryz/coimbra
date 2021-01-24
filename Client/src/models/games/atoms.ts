import { atom } from 'recoil';
import { Game } from './types'

export const gamesState = atom<Game[]>({
    key: 'gamesState',
    default: [],
});