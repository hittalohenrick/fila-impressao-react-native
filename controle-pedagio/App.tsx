import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';

type Veiculo = {
  id: string;
  tipo: string;
  hora: string;
};

export default function App() {
  const [tipo, setTipo] = useState('');
  const [fila, setFila] = useState<Veiculo[]>([]);

  const adicionarCarro = () => {
    if (!tipo.trim()) {
      Alert.alert('Tipo de veículo é obrigatório!');
      return;
    }

    const novoVeiculo: Veiculo = {
      id: Math.random().toString(),
      tipo,
      hora: new Date().toLocaleTimeString()
    };

    setFila([...fila, novoVeiculo]);
    setTipo('');
  };

  const atenderCarro = () => {
    if (fila.length === 0) {
      Alert.alert('Nenhum carro na fila!');
      return;
    }

    const [primeiro, ...resto] = fila;
    Alert.alert('Atendido', `Veículo: ${primeiro.tipo}, Hora: ${primeiro.hora}`);
    setFila(resto);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚗 Controle de Pedágio</Text>

      <TextInput
        placeholder="Tipo de veículo"
        style={styles.input}
        value={tipo}
        onChangeText={setTipo}
      />

      <Button title="Adicionar à fila" onPress={adicionarCarro} color="#2196F3" />

      <Button title="Atender próximo veículo" onPress={atenderCarro} color="#4CAF50" />

      <Text style={styles.subtitle}>Fila atual:</Text>
      <FlatList
        data={fila}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Text>{index + 1}. {item.tipo} - {item.hora}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  subtitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 10,
    borderRadius: 5
  }
});
