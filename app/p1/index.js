import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import Carousel, { PaginationLight } from 'react-native-x-carousel';
import { Link } from 'expo-router';

const { width, height } = Dimensions.get('window');

const DADOS = [
  {
    imagemCapaUri: 'https://abre.ai/gY1d',
    corLabelCanto: '#008080',
    textoLabelCanto: 'Hambúrguer',
  },
  {
    imagemCapaUri: 'https://abre.ai/gY1l',
    corLabelCanto: '#008080',
    textoLabelCanto: 'x-Búrguer',
  },
  {
    imagemCapaUri: 'https://abre.ai/gY1A',
    corLabelCanto: '#008080',
    textoLabelCanto: 'x-Bacon',
  },
  {
    imagemCapaUri: 'https://abre.ai/gY1Y',
    corLabelCanto: '#008080',
    textoLabelCanto: 'X-Tudo',
  },
  {
    imagemCapaUri: 'http://i.pinimg.com/564x/e6/b8/f8/e6b8f8c516a80440cac570cefddc175f.jpg',
    corLabelCanto: '#008080',
    textoLabelCanto: 'Coca-Cola 350ml',
  },
  {
    imagemCapaUri: 'https://abre.ai/gY16',
    corLabelCanto: '#008080',
    textoLabelCanto: 'Coca-Cola 600ml',
  },
];

const Carossel = () => {
  const renderItem = (data) => (
    <View key={data.imagemCapaUri} style={styles.containerCartao}>
      <Image style={styles.cartao} source={{ uri: data.imagemCapaUri }} />
      <View
        style={[styles.labelCanto, { backgroundColor: data.corLabelCanto }]}
      >
        <Text style={styles.textoLabelCanto}>{data.textoLabelCanto}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Link href={'/'} style={styles.botaoVoltar}>Voltar Para o Menu</Link>
      <Link href="/p2" style={styles.botaoAvancar}>Avançar para FlatList</Link>
      <Text style={styles.tituloCarrossel}>Carrossel de Produtos</Text>
      <View style={styles.containerCarrossel}>
        <Carousel
          pagination={PaginationLight}
          renderItem={renderItem}
          data={DADOS}
          loop
          autoplay
          direction="vertical"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  containerCarrossel: {
    backgroundColor: 'white',
    width: width,
    height: height * 0.6,
  },
  containerCartao: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  cartao: {
    width: width,
    height: height * 0.4,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  labelCanto: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 8,
  },
  textoLabelCanto: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
  tituloCarrossel: {
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
    fontSize: 16
  },
  botaoAvancar: {
    position: 'absolute',
    top: 30,
    right: 16,
    fontWeight: 'bold',
    color: '#008080',
    fontSize: 16
  }
});

export default Carossel;