import 'react-native-gesture-handler';

import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//import Icon from 'react-native-vector-icons';

import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Main from './components/Main';
import Logout from './components/Logout';
import Detalhes from './components/Detalhes';
import MapView from './components/MapView';

export default function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  myTabs = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name='Main' component={MapView}/>
        <Tab.Screen name='Detalhes' component={Detalhes}/>
        <Tab.Screen name='Logout' component={Logout}/>
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Cadastro' component={Cadastro} />
        <Stack.Screen name='Main' component={myTabs} />
      </Stack.Navigator>
    </NavigationContainer>


  );
};
