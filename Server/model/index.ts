export interface IGame {
    ownerId: string;
    playersIds: string[];
    id: string;
}

interface IState {
    games: IGame[];
}

export let state: IState = {
    games: [],
}