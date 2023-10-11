/* eslint-disable no-undef */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

function HomeAuth() {
  const navigation = useNavigation();

  const navigateToSearchView = () => {
    navigation.navigate('OffersSearchView');
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/main.png')} style={styles.image} />
      <Text style={styles.title}>Seja Bem-vindo!</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToSearchView}>
        <Icon name="airplane" size={24} color="white" />
        <Text style={styles.buttonText}>Buscar Voos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
        <Icon name="login" size={24} color="white" />
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200, // Adjust the width based on your design
    height: 100, // Adjust the height based on your design
    resizeMode: 'contain', // Adjust the resizeMode based on your design
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ef7946',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 10,
  },
});

export default HomeAuth;
