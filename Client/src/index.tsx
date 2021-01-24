import * as React from 'react';
import { render } from 'react-dom';
import {
    RecoilRoot,
} from 'recoil';
import { ChakraProvider } from "@chakra-ui/react"

import App from './App';

const rootElement = document.getElementById('app');

render((
    <RecoilRoot>
        <ChakraProvider>
            <App />
        </ChakraProvider>
    </RecoilRoot>
), rootElement);