export interface IGame {
    ownerId: string;
    playersIds: string[];
    id: string;
    playersNumber: number;
    currentPlayersNumber: number;
}

interface IState {
    games: IGame[];
}

export let state: IState = {
    games: [],
}