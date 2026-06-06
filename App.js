import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Home from './screen/Home';
import rankings from './screen/rankings';
import Saludo from './Saludo';


const Tab= createMaterialTopTabNavigator();
export default function App() {
  return (
    
  <NavigationContainer>
    <Saludo/>
    <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        
      },
      tabBarItemStyle: {width: 150, height: 50},
      tabBarStyle: {backgroundColor: '#1c3482'},
      tabBarActiveTintColor: '#ffffff',
      tabBarInactiveTintColor: '#d6e3ff',
      
      }}
      >
        <Tab.Screen
        name="inicio"
        component={Home}
        />
        <Tab.Screen
        name="rankings"
        component={rankings}
        />
        
        </Tab.Navigator>
        </NavigationContainer>
        );
      }