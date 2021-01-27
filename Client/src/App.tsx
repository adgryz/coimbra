import * as React from 'react'
import { hot } from 'react-hot-loader';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Lobby from 'scenes/lobby/Lobby';
import Login from 'scenes/login/Login';
import Board from 'scenes/game/Board';
import SocketListener from './SocketListener';

const App = () => {
    return (
        <Router>
            <SocketListener />
            <Switch>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/lobby">
                    <Lobby />
                </Route>
                <Route exact path="/">
                    <Board />
                </Route>
            </Switch>
        </Router>
    )
}

export default hot(module)(App)