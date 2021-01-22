import * as React from 'react'
import { hot } from 'react-hot-loader';

export interface IAppProps {
    appName: string;
}


const App = (props: IAppProps) => {
    return (
        <div>
            {props.appName}
        </div>
    )
}

export default hot(module)(App)