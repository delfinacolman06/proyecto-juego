/*import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Home from './screen/Home';
import rankings from './screen/rankings';
import Saludo from './Saludo'

const Tab= createMaterialTopTabNavigator();
export default function Menu() {
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
        name="competencia"
        component={rankings}
        />
        
        </Tab.Navigator>
        </NavigationContainer>
        );
}*/
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'

import Home from './screen/Home';
import Rankings from './screen/Rankings';
import Saludo from './Saludo';
import Ajustes from './screen/Ajustes';

const Tab = createMaterialTopTabNavigator();
function Menu({ navigation }) {
    return (
        <View style={styles.center}>
        </View>
    );
}
export default function MyTab() {

    return (
        <>
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
                            width: 150,
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
                        component={Rankings}
                    />
                    <Tab.Screen
                    name="ajustes"
                    component={Ajustes}
                />

                </Tab.Navigator>
            </ImageBackground>
        </>

    )
}
const styles = StyleSheet.create({
    /*background: {
        flex: 1,
    },*/
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    /*boton: {
       /* backgroundColor: '#57319e',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: '5%',
        alignItems: 'center',
    },
    texto: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    }*/
})
