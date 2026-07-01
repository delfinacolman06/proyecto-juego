import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ImageBackground } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Rankings from './Rankings';
import Niveles from '../Niveles';
import BotonJugar from '../BotonJugar';
const Stack = createStackNavigator();

/*function Home() {
  return (
    <View style={styles.center}>
      <Text>Pantalla de Inicio</Text>
    </View>
  );
}*/

function Home({ navigation }) {
  return (
    <View style={styles.center}>
      <Button
        title="Niveles"
        onPress={() => navigation.navigate('Niveles')}
      />
      <BotonJugar>Hola</BotonJugar>
    </View>
  );
}
export default function MyStack() {
  return (
    
    <Stack.Navigator
    
      screenOptions={{
        /*headerStyle: {
          backgroundColor: '#1c3482',
        },*/
        headerTintColor: '#ffffff',
        /*headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },*/  
        headerShown: false,
       /* cardStyle: {
          backgroundColor: '#1552d4',
        },*/
        cardStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Stack.Screen
        name="🏠︎ Home"
        component={Home}
        options={{ title: 'Inicio' }}
      />
      <Stack.Screen
        name="Niveles"
        component={Niveles}
        options={{ title: 'Niveles' }}
      />
    </Stack.Navigator>
    
  );
}
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
 
});
