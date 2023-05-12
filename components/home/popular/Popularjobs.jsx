import {useState} from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator,  } from 'react-native';

import { useRouter } from 'expo-router';

import { COLORS, SIZES } from '../../../constants'; 

import styles from './popularjobs.style';

import PopularJobCard from '../../common/cards/popular/PopularJobCard';

import useFetch from '../../../hook/useFetch';


const Popularjobs = () => {
  const router = useRouter();
  const {data, isLoading, error} = useFetch('search', {query: 'Python developer in Texas, USA', page: '1', num_pages: '1'});
  console.log(data);
  const handleCardPress = () =>{};
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity><Text style={styles.headerBtn}>Show all</Text></TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
          {
            isLoading ? (
              <ActivityIndicator size={SIZES.large} color={COLORS.primary} />
            )
            : error ? (
              <Text>Something went wrong</Text>
            )
            : (
              <FlatList 
                data={data}
                renderItem={({item}) =>(
                    <PopularJobCard item={item} handleCardPress={() => handleCardPress(item)}/>
                )}
                keyExtractor={item => item?.job_id}
                contentContainerStyle={{columnGap: SIZES.medium}}
                horizontal
              />
            )
          }
      </View>
    </View>
  )
}

export default Popularjobs