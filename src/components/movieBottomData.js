import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const MovieBottomData = ({ data, theme, baseUrl, api_key }) => {
   //estado para guardar los datos de la pelicula
   const [movieInfo, setMovieInfo] = useState(null);
   //loading estado para esperar a que la api mande respuesta
   const [loading, setLoading] = useState(true);

   //link de themoviedb para obtener descripcion detallada de la pelicula con el obtenido antes id
   const movieDataUrl = `${baseUrl}${data.id}${api_key}&language=en-US`;

   useEffect(() => {
      const subscriber = getMovieData();

      return () => subscriber;
   }, []);

   const getMovieData = () => {
      //Pido a themoviedb descripcion de la pelicula
      fetch(movieDataUrl)
         .then((response) => response.json())
         .then((data) => {
            //guardo los datos en el estado
            setMovieInfo(data);
            //deshabilito el cargando
            setLoading(false);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   // Si el api no ha respondido el componente se quedara cargando
   if (loading)
      return (
         <View style={[styles.loader, { backgroundColor: theme.background }]}>
            <ActivityIndicator color={theme.text} size={50} />
         </View>
      );
   //cuando el server responda hago un mapeo de los studios, generos mostrandolos como texto
   return (
      <View style={{ marginVertical: 20 }}>
         <View style={styles.textContainer}>
            <Text style={[styles.textOne, { color: theme.text }]}>Studio</Text>

            {movieInfo.production_companies.map((company) => (
               <Text key={company.id} style={styles.textTwo}>
                  {company.name}
               </Text>
            ))}
         </View>

         <View style={styles.textContainer}>
            <Text style={[styles.textOne, { color: theme.text }]}>Genre</Text>
            {movieInfo.genres.map((genre) => (
               <Text key={genre.id} style={styles.textTwo}>
                  {genre.name}
               </Text>
            ))}
         </View>
         <View style={styles.textContainer}>
            <Text style={[styles.textOne, { color: theme.text }]}>Release</Text>
            <Text style={styles.textTwo}>{movieInfo.release_date}</Text>
         </View>
      </View>
   );
};

export default MovieBottomData;

const styles = StyleSheet.create({
   textContainer: {
      flexDirection: 'row',
      marginVertical: 5,
   },
   textOne: {
      marginRight: 20,
   },
   textTwo: {
      color: '#6b7480',
   },
});
