import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';

import Navigator from './Navigator';
import store from './store';

const App = () => {
    return (
        <Provider store={store}>
            <Navigator />
        </Provider>
    );
};

export default App;
