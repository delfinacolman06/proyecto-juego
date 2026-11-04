import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Cuenta from './Cuenta';

const Stack = createNativeStackNavigator();

export default function Ajustes({ cuenta }) {
    return (
        <Stack.Navigator
            initialRouteName="Cuenta"
            screenOptions={{
                headerShown: false,

                headerStyle: {
                    backgroundColor: '#1c348200',
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                contentStyle: {
                    backgroundColor: '#102044',
                },
            }}
        >
            <Stack.Screen
                name="Cuenta"
                options={{ title: 'Mi cuenta' }}
            >
                {(props) => (
                    <Cuenta {...props} cuenta={cuenta} />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
}