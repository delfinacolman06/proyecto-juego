
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ImageBackground } from 'react-native';

import Home from './screen/Home';
import Rankings from './screen/Rankings';
import Saludo from './Saludo';
import Ajustes from './screen/Ajustes';

const Tab = createMaterialTopTabNavigator();

export default function MyTab({ route }) {

    // Recibir los datos enviados desde IniciarSesion
    const cuenta = route.params?.cuenta;

    console.log('DATOS EN MENU:', cuenta);

    return (
        <ImageBackground
            source={require('./assets/fondoMenu.png')}
            style={{ flex: 1 }}
            resizeMode="cover"
        >

            <Saludo />

            <Tab.Navigator
                screenOptions={{
                    sceneStyle: {
                        backgroundColor: 'transparent',
                    },

                    tabBarLabelStyle: {
                        fontSize: 14,
                        fontWeight: 'bold',
                    },

                    tabBarItemStyle: {
                        width: 135,
                        height: 50
                    },

                    tabBarStyle: {
                        backgroundColor: 'transparent'
                    },

                    tabBarActiveTintColor: '#ffffff',
                    tabBarInactiveTintColor: '#d6e3ff',
                }}
            >

                <Tab.Screen
                    name="🏠︎ inicio"
                    component={Home}
                />

                <Tab.Screen
                    name="♛ ranking"
                >
                    {(props) => (
                        <Rankings
                            {...props}
                            cuenta={cuenta}
                        />
                    )}
                </Tab.Screen>

                <Tab.Screen
                    name="ajustes"
                >
                    {(props) => (
                        <Ajustes
                            {...props}
                            cuenta={cuenta}
                        />
                    )}
                </Tab.Screen>

            </Tab.Navigator>

        </ImageBackground>
    );
}
