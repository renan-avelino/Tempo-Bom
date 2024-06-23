import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

 const Header = ({ background, weather, icon }) => {
  
  return (
    <LinearGradient style={styles.header} colors={background}>
      <Text style={styles.date}>{weather.date}</Text>
      <Text style={styles.city}>{weather.city_name}</Text>
      <Ionicons name={icon.name} color={icon.color} size={156} />
      <Text style={styles.temp}>{weather.temp}º</Text>
    </LinearGradient>
  );
}

export default Header;

const styles = StyleSheet.create({
  header: {
    width: '95%',
    height: '55%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  date: {
    color: 'white',
    fontSize: 17,
  },
  city: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  temp: {
    color: 'white',
    fontSize: 80,
    fontWeight: 'bold',
  },
});
