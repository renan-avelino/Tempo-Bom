import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Keyboard
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'
import {LinearGradient} from 'expo-linear-gradient'
import axios from 'axios'

import Conditions from '../../components/Conditions/index'

export default function Search() {

  const navigation = useNavigation()

  const [input, setInput] = useState('');
  const [city, setCity] = useState(null);
  const [error, setErrror] = useState(null)

  async function handleSearch ()
  {
      try 
      {

        // Consulta a API usando o recurso de buscar os dados pelo nome da cidade
        const response = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://api.hgbrasil.com/weather?key=791e0c02&city_name=${input}`)}`);
        if (response.data && response.data.contents) 
        {
          const parsedData = JSON.parse(response.data.contents);
          setCity(parsedData.results)
          console.log("Carregou!");

          if(parsedData.by == 'default')
          {
            setErrror("Hum, cidade não encontrada!")
            setInput('')
            setCity(null)
            Keyboard.dismiss()
            return
          }

          setCity(parsedData.results)
          setInput('')
          Keyboard.dismiss()

        } 
        else 
        {
          throw new Error('Response data or contents are missing.');
        }
      } 
      catch (error) 
      {
        alert("Falha na pesquisa! " + error )
        console.error('Erro ao carregar dados:', error);
      }
  }

  if(city)
  {
    return(
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')} >
          <Feather name="chevron-left" size={32} color="black" />
          <Text style={{ fontSize: 22 }}>Voltar</Text>
        </TouchableOpacity>
        <View style={styles.searchBox}>
          <TextInput
            value={input}
            onChangeText={(valor) => setInput(valor)}
            placeholder="Ex.: Campinas, SP"
            style={styles.input}
          />
          <TouchableOpacity style={styles.icon} onPress={() => handleSearch()} >
            <Feather name="search" size={23} color="white" />
          </TouchableOpacity>
          
        </View>

        <LinearGradient
          style={styles.header}
          colors={['#1ed6ff', 'lightblue']}
        >
          <Text style={styles.date}>{city.date}</Text>
          <Text style={styles.city}>{city.city_name}</Text>
          <View>
            <Text style={styles.temp}>{city.temp}º</Text>
          </View>

          <Conditions weather={city} />
        </LinearGradient>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')} >
        <Feather name="chevron-left" size={32} color="black" />
        <Text style={{ fontSize: 22 }}>Voltar</Text>
      </TouchableOpacity>
      <View style={styles.searchBox}>
        <TextInput
          value={input}
          onChangeText={(valor) => setInput(valor)}
          placeholder="Ex.: Campinas, SP"
          style={styles.input}
        />
        <TouchableOpacity style={styles.icon} onPress={() => handleSearch()} >
          <Feather name="search" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {error && <Text style={{marginTop: 25, fontSize:18 }}>{error}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '10%',
    backgroundColor: '#e8f0ff',
  },

  backButton: {
    flexDirection: 'row',
    marginLeft: 15,
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },

  searchBox:{
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ddd',
    width: '90%',
    height: 50,
    borderRadius: 8
  },

  input:{
    width: '85%',
    height: 50,
    backgroundColor: 'white',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    padding: 7
  },

  icon:{
    width: '15%',
    backgroundColor: '#1ed6ff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,

  },

  header:{

    marginTop: '5%',
    width: '90%',
    paddingTop: '3%',
    paddingBottom: '3%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8
  },

  date:{
    color: 'white',
    fontSize: 16
  },

  city:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },

  temp:{
    color: 'white',
    fontSize: 80,
    fontWeight: 'bold'
  }
});
