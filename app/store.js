import { configureStore } from '@reduxjs/toolkit';

import usersReducer from './screens/Users/Users.slice';
import feedReducer from './screens/Feed/Feed.slice';

const store = configureStore({
    reducer: {
        users: usersReducer,
        feed: feedReducer,
    },
});

export default store;
