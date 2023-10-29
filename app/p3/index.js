import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Link } from 'expo-router';
import axios from 'axios';

const URL_API = 'http://192.168.0.103:3001/produtos';

const SeletorProduto = () => {
  const [produtos, setProdutos] = useState([]);
  const [idProdutoSelecionado, setIdProdutoSelecionado] = useState(null);

  useEffect(() => {
    buscarProdutos();
  }, []);

  const buscarProdutos = async () => {
    try {
      const resposta = await axios.get(URL_API);
      const dados = resposta.data;
      if (dados) {
        setProdutos(dados);
      } else {
        console.error('Formato de dados inválido');
      }
    } catch (erro) {
      console.error('Erro ao buscar dados:', erro);
    }
  };

  const produtoSelecionado = produtos.find((produto) => produto.id === idProdutoSelecionado);

  return (
    <View style={styles.container}>
      <Link href={'/'} style={styles.botaoVoltar}>Voltar Para o Menu</Link>
      <Link href="/p4" style={styles.botaoAvancar}>Avançar por Categoria</Link>
      <Text style={styles.titulo}>Selecione um Produto</Text>

      <Picker
        selectedValue={idProdutoSelecionado}
        onValueChange={(valor) => setIdProdutoSelecionado(valor)}
        style={styles.seletor}
      >
        <Picker.Item label="Selecione um produto" value={null} />
        {produtos.map((produto) => (
          <Picker.Item key={produto.id} label={produto.nome} value={produto.id} />
        ))}
      </Picker>

      {produtoSelecionado && (
        <View style={styles.detalhesProdutoContainer}>
          <Image
            style={styles.imagemProduto}
            source={{ uri: produtoSelecionado.image }}
          />
          <View style={styles.item}>
            <Text style={styles.detalhesProdutoTexto}>Nome: {produtoSelecionado.nome}</Text>
            <Text style={styles.detalhesProdutoTexto}>Descrição: {produtoSelecionado.descricao}</Text>
            <Text style={styles.detalhesProdutoTexto}>Preço: R$ {produtoSelecionado.preco.toFixed(2)}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    marginTop: 90,
    color:'#800080'
  },
  seletor: {
    height: 50,
    width: '100%',
    marginBottom: 16,
    marginTop: 68,
  },
  detalhesProdutoContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  imagemProduto: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  detalhesProdutoTexto: {
    fontSize: 16,
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
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor:
 '#f2f2f2',
    borderRadius: 5,
  }
});

export default SeletorProduto;
