import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/pages/Home';
import MovieInfo from './src/pages/MovieInfo';

const Stack = createStackNavigator();

const App = () => {
   
   return (
      <NavigationContainer>
         <Stack.Navigator headerMode='none'>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Info" component={MovieInfo} />
         </Stack.Navigator>
      </NavigationContainer>
   );
};

export default App;
