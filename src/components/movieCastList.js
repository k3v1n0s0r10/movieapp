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
   const [movieCast, setMovieCast] = useState(null);
   const [loading, setLoading] = useState(true);

   const movieCreditsUrl = `${baseUrl}${data.id}/credits${api_key}&language=en-US`;

   useEffect(() => {
      const subscriber = getMovieData();

      return () => subscriber;
   }, []);

   const getMovieData = () => {
      fetch(movieCreditsUrl)
         .then((response) => response.json())
         .then((data) => {
            setMovieCast(data);
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
      <View style={styles.castContainer}>
         <FlatList
            data={movieCast.cast}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieCastItem item={item} />}
            ItemSeparatorComponent={() => (
               <View style={{ height: '100%', width: 20 }} />
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
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
