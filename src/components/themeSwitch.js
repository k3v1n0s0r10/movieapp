import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ThemeSwitch = ({ color, handler }) => {
   return (
      <>
         <TouchableOpacity
            activeOpacity={0.7}
            onPress={handler}
            style={[styles.themeSwitchContainer, { backgroundColor: color }]}>
            {color === '#FFF' ? (
               <FontAwesomeIcon icon={faMoon} size={30} color="#283546" />
            ) : (
               <FontAwesomeIcon icon={faSun} size={30} color="#FFF" />
            )}
         </TouchableOpacity>
      </>
   );
};

export default ThemeSwitch;

const styles = StyleSheet.create({
   themeSwitchContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
      height: 50,
      width: 50,
      paddingLeft: 10,
      paddingBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomLeftRadius: 1000,
   },
});
