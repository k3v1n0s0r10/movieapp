import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const MovieCastItem = ( { item } ) => {
   const baseUrl = 'https://image.tmdb.org/t/p/w154';
   const image_url = `${baseUrl}${item.profile_path}`;

   return (
      <View style={styles.castItem}>
         <Image source={{uri: image_url}} style={styles.castPhoto} />
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
