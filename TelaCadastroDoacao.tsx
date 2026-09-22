import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_DOACAO = '@instituto_mao_amiga:doacao';

// Ajuste os nomes dos campos abaixo para os que você já usa no seu formulário real
function TelaCadastroDoacao() {
  const [tipoItem, setTipoItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [pontoDestino, setPontoDestino] = useState('');

  // Carrega o que foi salvo da última vez, assim que a tela monta
  useEffect(() => {
    AsyncStorage.getItem(CHAVE_DOACAO).then((salvo) => {
      if (salvo) {
        const doacao = JSON.parse(salvo);
        setTipoItem(doacao.tipoItem ?? '');
        setQuantidade(doacao.quantidade ?? '');
        setPontoDestino(doacao.pontoDestino ?? '');
      }
    });
  }, []);

  // Salva no AsyncStorage sempre que o cadastro é confirmado
  function salvarDoacao() {
    const doacao = { tipoItem, quantidade, pontoDestino };
    AsyncStorage.setItem(CHAVE_DOACAO, JSON.stringify(doacao));
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Tipo do item"
        value={tipoItem}
        onChangeText={setTipoItem}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Ponto de destino"
        value={pontoDestino}
        onChangeText={setPontoDestino}
        style={styles.input}
      />
      <TouchableOpacity style={styles.botao} onPress={salvarDoacao}>
        <Text style={styles.botaoTexto}>Cadastrar doação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
  },
  botao: {
    backgroundColor: '#1B3A5C',
    borderRadius: 8,
    padding: 12,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  botaoTexto: { color: '#FFF', fontWeight: 'bold' },
});

export default TelaCadastroDoacao;
