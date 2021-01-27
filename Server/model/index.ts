export interface IGame {
    ownerId: string;
    playersIds: string[];
    id: string;
    playersNumber: number;
    currentPlayersNumber: number;
    isInProgress: boolean;
}

interface IState {
    games: IGame[];
}

export let state: IState = {
    games: [],
}