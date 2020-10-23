import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

//item individual del cast de la pelicula
const MovieCastItem = ( { item } ) => {
   //link proporcionado por themoviedb para obtener imagenes en width de 154px
   const baseUrl = 'https://image.tmdb.org/t/p/w154';

   //url a la imagen segun el actor
   const image_url = `${baseUrl}${item.profile_path}`;

   return (
      <View style={styles.castItem}>
         {/* Imagen del actor */}
         <Image source={{uri: image_url}} style={styles.castPhoto} />
         {/* Nombre del actor */}
         <Text style={styles.castText}>{item.name}</Text>
      </View>
   );
};

export default MovieCastItem;

const styles = StyleSheet.create({
   castItem:{
      width: 100,
      alignItems: 'center'
   },
   castPhoto: {
      width: 70,
      height: 70,
      borderRadius: 1000,
      flex: 2,
   },
   castText: {
      textAlign: 'center',
      flex: 1,
      color: '#6b7480',
      textAlignVertical: 'center',
      fontSize: 11,
      fontWeight: 'bold'
   }
});
