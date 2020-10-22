import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import {
   ActivityIndicator,
   Image,
   ScrollView,
   StyleSheet,
   Text,
   View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Stars from 'react-native-stars';
import MovieBottomData from '../components/movieBottomData';
import MovieCastList from '../components/movieCastList';

const MovieInfo = ({ route }) => {
   const baseUrl = 'https://api.themoviedb.org/3/movie/';
   const api_key = '?api_key=6741849b6b2428d53ee96150fd9d0300';

   const { theme, data } = route.params;

   const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
   const image_url = `${imageBaseUrl}${data.backdrop_path}`;

   return (
      <View style={styles.infoPage}>
         <Image source={{ uri: image_url }} style={styles.infoImage} />

         <ScrollView
            style={[styles.infoSection, { backgroundColor: theme.background }]}>
            <Text style={[styles.movieTitle, { color: theme.text }]}>
               {data.title}
            </Text>

            <View style={styles.watchNowSection}>
               <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.watchNowButton}>
                  <Text style={styles.watchNowText}>watch now</Text>
               </TouchableOpacity>
               <Stars
                  default={Math.floor(data.vote_average / 2)}
                  count={5}
                  half={false}
                  starSize={20}
                  fullStar={<FontAwesomeIcon icon={faStar} color="#fcd401" />}
                  emptyStar={<FontAwesomeIcon icon={faStar} color="#565637" />}
               />
            </View>
            <Text style={[styles.infoOverview]}>{data.overview}</Text>
            <MovieCastList
               baseUrl={baseUrl}
               api_key={api_key}
               theme={theme}
               data={data}
            />
            <MovieBottomData
               baseUrl={baseUrl}
               api_key={api_key}
               theme={theme}
               data={data}
            />
         </ScrollView>
      </View>
   );
};

export default MovieInfo;

const styles = StyleSheet.create({
   infoPage: {
      flex: 1,
   },
   infoImage: {
      height: '35%',
      width: '100%',
   },
   infoSection: {
      flex: 1,
      paddingHorizontal: '10%',
   },
   movieTitle: {
      fontSize: 20,
      marginTop: '10%',
   },
   watchNowSection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 20,
   },
   watchNowButton: {
      backgroundColor: '#6b7480',
      paddingHorizontal: 25,
      paddingVertical: 12,
      borderRadius: 1000,
   },
   watchNowText: {
      color: 'white',
      textTransform: 'uppercase',
      fontWeight: 'bold',
   },
   infoOverview: {
      fontSize: 14,
      color: '#79818b',
   },
});
