import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'


export default function Conditions ({weather})
{
  
  return(
    <View style={styles.container}>
      <View style={styles.condition}>
        <Feather name="wind" size={23} color="#1ed6ff" />
        <Text>{weather.wind_speedy}</Text>
      </View>
      <View style={styles.condition}>
        <MaterialCommunityIcons name="weather-sunset-up" size={23} color="#1ed6ff" />
        <Text>{weather.sunrise}</Text>
      </View>
      <View style={styles.condition}>
        <MaterialCommunityIcons name="weather-sunset-down" size={23} color="#1ed6ff" />
        <Text>{weather.sunset}</Text>
      </View>
      <View style={styles.condition}>
        <Feather name="droplet" size={23} color="#1ed6ff" />
        <Text>{weather.humidity}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    marginTop: 15,
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-around',
    borderRadius: 8
  },
  condition:{
    alignItems: 'center',
    justifyContent: 'center'
  }
})
