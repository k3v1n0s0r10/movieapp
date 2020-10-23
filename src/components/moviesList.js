import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import MovieItem from './movieItem';

//componente para mostrar la lista de peliculas
const MoviesList = ({ theme, data, title }) => {
   return (
      <View style={styles.listContainer}>
         <View style={styles.listHeader}>
            {/* Asignando tema al texto */}
            <Text style={[styles.listTitle, { color: theme.text }]}>
               {title}
            </Text>
            <Text style={styles.seeAll}>See all</Text>
         </View>
         <FlatList
            data={data}
            initialNumToRender={3}
            keyExtractor={(item) => item.id.toString()}
            //componente individual para cada pelicula
            renderItem={({ item }) =><MovieItem data={item} theme={theme} />}
            ItemSeparatorComponent={() => (
               //separador de la lista
               <View style={{ height: '100%', width: 20 }} />
            )}
            horizontal={true}
            //scroll horizontal
            showsHorizontalScrollIndicator={false}
         />
      </View>
   );
};

export default MoviesList;

const styles = StyleSheet.create({
   listContainer: {
      marginTop: 10,
   },
   listHeader: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
   },
   listTitle: {
      fontSize: 16,
      textTransform: 'uppercase',
      fontWeight: 'bold',
   },
   seeAll: {
      color: 'gray',
   },
});
