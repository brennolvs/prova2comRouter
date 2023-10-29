import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import axios from 'axios';

const FlatlistProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarProdutos();
  }, []);

  const buscarProdutos = async () => {
    try {
      const resposta = await axios.get('http://192.168.0.103:3001/produtos');
      setProdutos(resposta.data);
      setCarregando(false);
    } catch (erro) {
      console.error('Erro ao buscar produtos:', erro);
    }
  };

  const handlePressProduto = (descricao, nome) => {
    Alert.alert(nome, descricao);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemProduto}
        onPress={() => handlePressProduto(item.descricao, item.nome)}>
        <View>
          <Text>{item.nome}</Text>
          <Text>Preço: R$ {item.preco.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Link href={'/'} style={styles.botaoVoltar}>Voltar Para o Menu</Link>
      <Link href="/p3" style={styles.botaoAvancar}>Avançar para Picker</Link>
      <Text style={styles.titulo}>Flatlist de Produtos</Text>
      {carregando ? (
        <Text>Carregando...</Text>
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  itemProduto: {
    backgroundColor: '#FFA500',
    marginBottom: 20,
    padding: 16,
    borderRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  descricao: {
    fontSize: 14,
    color: 'black',
    marginTop: 8,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    marginTop: 90,
    color:'#800080'
  },
  botaoVoltar: {
    position: 'absolute',
    top: 30,
    left: 16,
    fontWeight: 'bold',
    color: '#008080',
    fontSize: 16,
  },
  botaoAvancar: {
    position: 'absolute',
    top: 30,
    right: 16,
    fontWeight: 'bold',
    color: '#008080',
    fontSize: 16,
  },
});

export default FlatlistProdutos;
