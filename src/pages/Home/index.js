import React, { useEffect, useState } from 'react';
import { SafeAreaView,View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns';
import * as Location from 'expo-location';
import {LinearGradient} from 'expo-linear-gradient'
import { Ionicons, Feather } from '@expo/vector-icons'

import Forecast from '../../components/Forecast/index';
import Menu from '../../components/Menu/index';
import Header from '../../components/Header/index';
import Conditions from '../../components/Conditions/index';

const WeatherComponent = () => {
  
  const [icon, setIcon] = useState({ name: 'cloud', color: 'white' });
  const [background, setBackground] = useState(["#1ed6ff", "lightblue"]);
  const [weather, setWeather] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Solicita permissão para acessar a localização do dispositivo
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permissão de localização não concedida.');
          return;
        }

        // Obtém as coordenadas geográficas do dispositivo
        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // Consulta a API de clima com base nas coordenadas obtidas
        const response = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://api.hgbrasil.com/weather?key=791e0c02&lat=${latitude}&lon=${longitude}`)}`);
        if (response.data && response.data.contents) {
          
          const parsedData = JSON.parse(response.data.contents);
          setWeather(parsedData.results)
          console.log("Carregou!");

          // Configura o background com base no período do dia
          if (weather.currently == 'dia') 
          {
            setBackground(['black', 'darkblue']);
          }

          // Configura o ícone com base na condição do tempo
          switch (results.condition_slug) {
            case 'clear_day':
              setIcon({ name: 'partly-sunny', color: '#ffb300' });
              break;
            case 'rain':
            case 'storm':
              setIcon({ name: 'rainy', color: '#ffff' });
              break;
            default:
              setIcon({ name: 'cloud', color: 'white' });
              break;
          }
        } else {
          throw new Error('Response data or contents are missing.');
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      <Header background={background} icon={icon} weather={weather} />
      <Conditions weather={weather}/>
      <FlatList
        data={weather.forecast}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <Forecast data={item} />}
        horizontal
        contentContainerStyle={{ paddingBottom: '5%' }}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

export default WeatherComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f0ff',
    paddingTop: '5%',
  },
  list: {
    marginTop: 10,
    marginLeft: 10,
    width: '100%'
  },
});
