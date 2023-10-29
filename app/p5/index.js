import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Link } from 'expo-router';

const URL_API = 'http://192.168.0.103:3001/produtos';

const CategoriaProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  useEffect(() => {
    buscarProdutos();
  }, [categoriaSelecionada]);

  const buscarProdutos = async () => {
    try {
      const resposta = await axios.get(URL_API);
      const produtosFiltrados = resposta.data.filter(
        (produto) =>
          categoriaSelecionada === null ||
          produto.categoria_id === categoriaSelecionada
      );
      setProdutos(produtosFiltrados);
    } catch (erro) {
      console.error('Erro ao buscar produtos:', erro);
    }
  };

  return (
    <View style={styles.container}>
      <Link href={'/'} style={styles.botaoVoltar}>Voltar Para o Menu</Link>
      <Text style={styles.titulo}>Selecione uma categoria:</Text>
      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={styles.botaoCategoria}
          onPress={() => setCategoriaSelecionada(2)}
        >
          <Text style={styles.textoBotao}>Refrigerantes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoCategoria}
          onPress={() => setCategoriaSelecionada(1)}
        >
          <Text style={styles.textoBotao}>Hamburguers</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.titulo2}>Produtos:</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nome}</Text>
            <Text>Descrição: {item.descricao}</Text>
            <Text>Preço: R$ {item.preco.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    marginTop: 90,
    color:'#800080'
  },
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  botaoCategoria: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
    top: 29
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  botaoVoltar: {
    position: 'absolute',
    top: 10,
    left: 16,
    fontWeight: 'bold',
    color: '#008080',
    fontSize: 16,
  },
  titulo2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
  },
});

export default CategoriaProdutos;
