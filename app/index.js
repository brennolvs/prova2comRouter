import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Link } from 'expo-router';

const Stack = createNativeStackNavigator();

export default function PaginaPrincipal() {
  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Menu de Funcionalidades</Text>

      <TouchableOpacity style={styles.botao}>
        <Link href="/p1" style={styles.link}>Carrossel de produtos</Link>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao}>
        <Link href="/p2" style={styles.link}>Flatlist de Produtos</Link>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao}>
        <Link href="/p3" style={styles.link}>Picker de Produtos</Link>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao}>
        <Link href="/p4" style={styles.link}>Procurar por Nome</Link>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao}>
        <Link href="/p5" style={styles.link}>Buscar por Categoria</Link>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFA500",
  },
  botao: {
    backgroundColor: '#f6f6f6', 
    padding: 10, 
    borderRadius: 5,
    margin: 10, 
    height: 50,
    width: 250,
    elevation: 2
  },
  link: {
    color: "#000", 
    fontSize: 20,
    textDecorationLine: 'none',
    textAlign: 'center'
  },
  titulo: {
    color: '#f6f6f6',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 100,
    textShadowColor: '#FFA500', 
    
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 5, 
  },
});
