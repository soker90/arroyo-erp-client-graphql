import React from 'react';
import {Provider} from 'react-redux';
import createStore from '../redux/create-store';

const store = createStore();

export default ({children}) => <Provider store={store}>{children}</Provider>;
