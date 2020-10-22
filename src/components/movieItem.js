import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Stars from 'react-native-stars';
import { useNavigation } from '@react-navigation/native';

const MovieItem = ({ data, theme }) => {
   const baseUrl = 'https://image.tmdb.org/t/p/w154';
   const image_url = `${baseUrl}${data.poster_path}`;

   const navigation = useNavigation();

   return (
      <TouchableOpacity activeOpacity={0.8} style={styles.movieItem} onPress={() => navigation.push('Info', { theme: theme, data: data })}>
         <Image source={{ uri: image_url }} style={styles.movieImage} />

         <Text style={[styles.movieTitle, { color: theme.text }]}>
            {data.title}
         </Text>
         <View style={styles.movieStars}>
            <Stars
               default={Math.floor(data.vote_average / 2)}
               count={5}
               half={false}
               starSize={20}
               fullStar={<FontAwesomeIcon icon={faStar} color="#fcd401" />}
               emptyStar={<FontAwesomeIcon icon={faStar} color="#565637" />}
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
