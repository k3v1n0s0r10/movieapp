import React, { useEffect, useState } from 'react';

import {
   ActivityIndicator,
   ScrollView,
   StyleSheet,
   Text,
   TextInput,
   View,
} from 'react-native';

import ThemeSwitch from '../components/themeSwitch';
import MoviesList from '../components/moviesList';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const Home = () => {
   const [loading, setLoading] = useState(true);
   const [moviesData, setMoviesData] = useState(null);
   const [themeColor, setThemeColor] = useState({
      background: '#283546',
      text: '#cacdd1',
   });

   useEffect(() => {
      const subscriber = checkMovies();

      return () => subscriber;
   }, []);

   const checkMovies = () => {
      const baseUrl = 'https://api.themoviedb.org/3/movie';
      const api_key = '?api_key=6741849b6b2428d53ee96150fd9d0300';

      let urlPopularMovies = `${baseUrl}/popular/${api_key}&language=en-US&page=1`;
      let urlRatedMovies = `${baseUrl}/top_rated/${api_key}&language=en-US&page=1`;

      fetch(urlPopularMovies)
         .then((response) => response.json())
         .then((data) => {
            const popularMovies = data.results;

            fetch(urlRatedMovies)
               .then((response) => response.json())
               .then((data) => {
                  setMoviesData({
                     popular: popularMovies,
                     rated: data.results,
                  });
                  setLoading(false);
               })
               .catch((err) => {
                  console.log(err);
               });
         })
         .catch((err) => {
            console.log(err);
         });

      // fetch(
      //    'https://api.themoviedb.org/3/configuration?api_key=6741849b6b2428d53ee96150fd9d0300',
      // )
      //    .then((response) => response.json())
      //    .then((data) => {
      //       console.log(data)
      //    });
   };

   const changeColor = () => {
      setThemeColor(
         themeColor.background === '#FFF'
            ? {
                 background: '#283546',
                 text: '#cacdd1',
              }
            : {
                 background: '#FFF',
                 text: '#283546',
              },
      );
   };

   return (
      <View style={styles.homePage}>
         <ThemeSwitch color={themeColor.background} handler={changeColor} />

         <View style={styles.homeHeader}>
            <Text style={styles.homeTitle}>
               Hello, what do you want to watch ?
            </Text>

            <View style={styles.searchContainer}>
               <FontAwesomeIcon style={styles.searchIcon} icon={faSearch} />

               <TextInput
                  placeholder="Search"
                  placeholderTextColor="#FFF"
                  style={styles.searchInput}
               />
            </View>
         </View>
         <ScrollView
            contentContainerStyle={{ flexGrow: 1, flexDirection: 'column' }}
            style={[
               styles.movieListsContainer,
               { backgroundColor: themeColor.background },
            ]}>
            {loading ? (
               <View style={styles.loaderContainer}>
                  <ActivityIndicator size={50} color={themeColor.text} />
               </View>
            ) : (
               <>
                  <MoviesList
                     theme={themeColor}
                     data={moviesData.popular}
                     title="popular movies"
                  />
                  <MoviesList
                     theme={themeColor}
                     data={moviesData.rated}
                     title="top rated"
                  />
               </>
            )}
         </ScrollView>
      </View>
   );
};

export default Home;

const styles = StyleSheet.create({
   homePage: {
      flex: 1,
      backgroundColor: '#5ca0d3',
   },

   homeHeader: {
      alignSelf: 'center',
      width: '80%',
      height: 200,
      justifyContent: 'space-around',
   },

   homeTitle: {
      color: '#FFF',
      fontSize: 25,
      fontWeight: 'bold',
   },
   searchContainer: {
      backgroundColor: '#8dbde0',
      borderRadius: 1000,
      height: '20%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
   },
   searchIcon: {
      color: '#FFF',
      marginRight: 10,
   },
   searchInput: {
      width: '90%',
      color: '#FFF',
      fontSize: 14,
   },

   movieListsContainer: {
      height: '100%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: '10%',
   },
   loaderContainer: {
      flexGrow: 1,
      justifyContent: 'center',
   },
});
