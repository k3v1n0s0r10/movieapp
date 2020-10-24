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

//iconos
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
   //Estados
   //loading espera a que la aplicación reciba respuesta de la api para mostrar las peliculas
   const [loading, setLoading] = useState(true);
   //MoviesData guarda los datos de todas peliculas
   const [moviesData, setMoviesData] = useState(null);
   //themecolor cambia el tema de la aplicación
   const [themeColor, setThemeColor] = useState({
      background: '#283546',
      text: '#cacdd1',
   });

   useEffect(() => {
      const subscriber = checkMovies();

      return () => subscriber;
   }, []);

   //Funcion para recibir la información de las peliculas
   const checkMovies = () => {
      //link proporsionados por themoviedb para obtener datos segun la pelicula
      const baseUrl = 'https://api.themoviedb.org/3/movie';
      //llave de themoviedb de kevin osorio
      const api_key = '?api_key=6741849b6b2428d53ee96150fd9d0300';

      //creo los links segun los datos que quiero pedir
      //peliculas populares en ingles
      let urlPopularMovies = `${baseUrl}/popular${api_key}&language=en-US&page=1`;

      //peliculas mejor votadas en ingles
      let urlRatedMovies = `${baseUrl}/top_rated${api_key}&language=en-US&page=1`;

      //pido a la api la data de las peliculas mejor votadas
      fetch(urlPopularMovies)
         .then((response) => response.json())
         .then((data) => {
            //guardo la data de las peliculas populares para guardarlo en el estado mas tarde
            const popularMovies = data.results;

            //pido a la api la data de las peliculas mejor votadas
            fetch(urlRatedMovies)
               .then((response) => response.json())
               .then((data) => {
                  //guardo las 2 data en el estado moviesData
                  setMoviesData({
                     popular: popularMovies,
                     rated: data.results,
                  });
                  //quito el cargando ya que obtuve y guarde correctamente los datos, ahora puede ver las peliculas
                  setLoading(false);
               })
               .catch((err) => {
                  //manejando errores
                  console.log(err);
               });
         })
         .catch((err) => {
            //manejando errores
            console.log(err);
         });
   };

   //funcion para cambiar el tema
   const changeColor = () => {
      //cambiando el estado tema
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
            {
               //Muestra cargando hasta que la api mande una respuesta y esta se almacene en el estado
               loading ? (
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
               )
            }
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
