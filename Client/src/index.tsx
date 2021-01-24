import * as React from 'react';
import { render } from 'react-dom';
import {
    RecoilRoot,
} from 'recoil';

import App from './App';

const rootElement = document.getElementById('app');

render((
    <RecoilRoot>
        <App />
    </RecoilRoot>
), rootElement);