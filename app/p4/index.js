import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import axios from 'axios';

const URL_API = 'http://192.168.0.103:3001/produtos';

const BuscarProdutosPorNome = () => {
    const [produtos, setProdutos] = useState([]);
    const [nomeProduto, setNomeProduto] = useState('');

    const buscarProdutosPorNome = async () => {
        try {
            const resposta = await axios.get(URL_API);
            const produtosFiltrados = resposta.data.filter(
                (produto) =>
                    produto.nome.toLowerCase().includes(nomeProduto.toLowerCase())
            );
            setProdutos(produtosFiltrados);
        } catch (erro) {
            console.error('Erro ao buscar produtos:', erro);
        }
    };

    return (
        <View style={styles.container}>
            <Link href={'/'} style={styles.botaoVoltar}>Voltar Para o Menu</Link>
            <Link href="/p5" style={styles.botaoAvancar}>Avançar por Categoria</Link>
            <Text style={styles.titulo}>Buscar Produtos por Nome</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o nome do produto"
                value={nomeProduto}
                onChangeText={(text) => setNomeProduto(text)}
            />
            <TouchableOpacity
                style={styles.botao}
                onPress={buscarProdutosPorNome}
            >
                <Text style={styles.textoBotao}>Buscar</Text>
            </TouchableOpacity>
            <Text style={styles.titulo2}>Produtos Encontrados:</Text>
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
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        marginTop: 90,
        color:'#800080'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },
    botao: {
        backgroundColor: '#FFA500',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10
    },
    textoBotao: {
        color: '#fff',
        fontWeight: 'bold',
    },
    item: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
    },
    titulo2: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        marginTop: 30
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

export default BuscarProdutosPorNome;
