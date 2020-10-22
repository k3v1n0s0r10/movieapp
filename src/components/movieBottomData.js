import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const MovieBottomData = ({ data, theme, baseUrl, api_key }) => {
   const [movieInfo, setMovieInfo] = useState(null);
   const [loading, setLoading] = useState(true);

   const movieDataUrl = `${baseUrl}${data.id}${api_key}&language=en-US`;

   useEffect(() => {
      const subscriber = getMovieData();

      return () => subscriber;
   }, []);

   const getMovieData = () => {
      fetch(movieDataUrl)
         .then((response) => response.json())
         .then((data) => {
            setMovieInfo(data);

            setLoading(false);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   if (loading)
      return (
         <View style={[styles.loader, { backgroundColor: theme.background }]}>
            <ActivityIndicator color={theme.text} size={50} />
         </View>
      );

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
