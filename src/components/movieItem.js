import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Stars from 'react-native-stars';
import { useNavigation } from '@react-navigation/native';

const MovieItem = ({ data, theme }) => {
   //link proporcionado por themoviedb para obtener imagenes con width de 154 segun la pelicula
   const baseUrl = 'https://image.tmdb.org/t/p/w154';
   //data.poster_path es una terminacion en /imagen.jpg que proporciona cada pelicula
   const image_url = `${baseUrl}${data.poster_path}`;

   const navigation = useNavigation();

   return (
      // el componente de pelicula individual es un boton que al precionar en cualquier elemento dentro lleva a la descripción de la pelicula
      <TouchableOpacity
         activeOpacity={0.8}
         style={styles.movieItem}
         //navegacion a informacion de peliculas y aplicando temas
         onPress={() => navigation.push('Info', { theme: theme, data: data })}>
         <Image source={{ uri: image_url }} style={styles.movieImage} />

         <Text style={[styles.movieTitle, { color: theme.text }]}>
            {data.title}
         </Text>
         <View style={styles.movieStars}>
            <Stars
               default={Math.floor(data.vote_average / 2)}
               //maximo 5 estrellas
               count={5}
               //no hay media estrella
               half={false}
               starSize={20}
               fullStar={
                  //iconos estrella llena
                  <FontAwesomeIcon icon={faStar} color="#fcd401" />
               }
               emptyStar={
                  //icono estrella vacia
                  <FontAwesomeIcon icon={faStar} color="#565637" />
               }
            />
         </View>
      </TouchableOpacity>
   );
};

export default MovieItem;

const styles = StyleSheet.create({
   movieItem: {
      flex: 1,
      width: 150,
      height: 300,
      flexDirection: 'column',
   },
   movieImage: {
      height: 180,
      borderRadius: 20,
      flex: 5,
   },
   movieTitle: {
      fontWeight: 'bold',
      fontSize: 14,
      flex: 2,
      textAlignVertical: 'center',
   },
   movieStars: {
      flex: 1,
      alignItems: 'center',
      textAlign: 'left',
      width: 80,
   },
});
