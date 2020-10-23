import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MovieInfo from './src/pages/MovieInfo';
import Home from './src/pages/Home';

import { BackHandler, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const Stack = createStackNavigator();

const App = () => {
   // suscripcion al estado de conexión
   useEffect(() => {
      checkConnection();
      const intervalId = setInterval(() => {
         checkConnection();
      }, 10000);
      return () => clearInterval(intervalId);
   }, []);

   const checkConnection = () => {
      //agrego el listener del internet
      NetInfo.fetch().then((state) => {
         //si el estado de conexión en falso
         if (!state.isConnected || !state.isInternetReachable) {
            //alerta para cerrar la aplicación obligatoriamente
            Alert.alert(
               'No tienes conexión a internet',
               '',
               [
                  { text: 'Esperar' },
                  { text: 'Salir', onPress: () => BackHandler.exitApp() },
               ],
               { cancelable: true },
            );
         }
      });
   };

   return (
      //navegacion entre pantallas
      <NavigationContainer>
         <Stack.Navigator headerMode="none">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Info" component={MovieInfo} />
         </Stack.Navigator>
      </NavigationContainer>
   );
};

export default App;
