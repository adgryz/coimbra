import * as React from 'react'
import { hot } from 'react-hot-loader';
import { useRecoilState } from 'recoil';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import { gamesState } from 'models/games/atoms'
import { Game } from 'models/games/types';
import socket from 'services/socket';

import Lobby from 'scenes/lobby/Lobby';
import Login from 'scenes/login/Login';

const App = () => {
    const [games, setGames] = useRecoilState(gamesState);

    React.useEffect(() => {
        socket.on('gamesUpdated', (games: Game[]) => {
            setGames(games);
            console.log(games, 'games');
        })
    }, [])

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route exact path="/lobby">
                    <Lobby />
                </Route>
            </Switch>
        </Router>
    )
}

export default hot(module)(App)