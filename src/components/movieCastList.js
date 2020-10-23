import React, { useEffect, useState } from 'react';
import {
   ActivityIndicator,
   FlatList,
   StyleSheet,
   Text,
   View,
} from 'react-native';
import MovieCastItem from './movieCastItem';

const MovieCastList = ({ data, theme, baseUrl, api_key }) => {
   //estado para guardar los datos del cast de la pelicula
   const [movieCast, setMovieCast] = useState(null);
   //loading estado para esperar a que la api mande respuesta
   const [loading, setLoading] = useState(true);

   //link proporcionado por themoviedb para obtener los creditos de una pelicula segun su id
   const movieCreditsUrl = `${baseUrl}${data.id}/credits${api_key}&language=en-US`;

   useEffect(() => {
      const subscriber = getMovieData();

      return () => subscriber;
   }, []);

   //funcion para pedir credits de la pelicula
   const getMovieData = () => {
      fetch(movieCreditsUrl)
         .then((response) => response.json())
         .then((data) => {
            //se guardan los datos
            setMovieCast(data);
            //se deshabilita el cargando, ahora se puede ver el componente
            setLoading(false);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   //Muestra cargando mientras espera respuesta de la api
   if (loading)
      return (
         <View style={[styles.loader, { backgroundColor: theme.background }]}>
            <ActivityIndicator color={theme.text} size={50} />
         </View>
      );
   // una vez la api manda respuesta muestra el componente el cual es una lista del cast
   return (
      <View style={styles.castContainer}>
         <FlatList
            data={movieCast.cast}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieCastItem item={item} />}
            //separador
            ItemSeparatorComponent={() => (
               <View style={{ height: '100%', width: 20 }} />
            )}
            horizontal={true}
            //no muestra la barra del scroll
            showsHorizontalScrollIndicator={false}
            //inicialmente renderiza 5 elementos
            initialNumToRender={5}
         />
      </View>
   );
};

export default MovieCastList;

const styles = StyleSheet.create({
   castContainer: {
      marginTop: 20,
      height: 120,
   },
});
