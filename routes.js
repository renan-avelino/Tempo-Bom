import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './pages/Home/index';
import Search from './pages/Search/index';

const Drawer = createDrawerNavigator();

export default function Routes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Minha Cidade',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Procurar',
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
