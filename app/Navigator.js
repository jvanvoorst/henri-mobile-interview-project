// import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Users from './screens/Users';
import Feed from './screens/Feed';
import Todos from './screens/Todos';

const Navigator = createBottomTabNavigator({
    Users,
    Feed,
    Todos
});

export default createAppContainer(Navigator);
