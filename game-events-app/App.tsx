import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';

type Evento = {
  id: string;
  tipo: string;
  jogador: string;
  hora: string;
};

const tiposDeEvento = ['⚔️ Ataque', '🛡️ Defesa', '💊 Cura', '🔥 Magia'];

export default function App() {
  const [filaEventos, setFilaEventos] = useState<Evento[]>([]);
  const [contador, setContador] = useState(1);

  const adicionarEvento = (tipo: string) => {
    const novoEvento: Evento = {
      id: `E${contador}`,
      tipo,
      jogador: `Jogador${Math.floor(Math.random() * 4) + 1}`,
      hora: new Date().toLocaleTimeString()
    };

    setFilaEventos([...filaEventos, novoEvento]);
    setContador(contador + 1);
  };

  const processarEvento = () => {
    if (filaEventos.length === 0) {
      Alert.alert('Nenhum evento na fila!');
      return;
    }

    const [eventoAtual, ...resto] = filaEventos;
    Alert.alert(
      '🎮 Evento processado',
      `ID: ${eventoAtual.id}\nTipo: ${eventoAtual.tipo}\nJogador: ${eventoAtual.jogador}\nHora: ${eventoAtual.hora}`
    );
    setFilaEventos(resto);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🕹️ Fila de Eventos do Jogo</Text>

      <View style={styles.buttonGroup}>
        {tiposDeEvento.map((tipo, idx) => (
          <Button key={idx} title={`Adicionar ${tipo}`} onPress={() => adicionarEvento(tipo)} />
        ))}
      </View>

      <Button title="⚙️ Processar próximo evento" onPress={processarEvento} color="#4CAF50" />

      <Text style={styles.subtitle}>Eventos na fila:</Text>
      <FlatList
        data={filaEventos}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Text>{index + 1}. {item.tipo} - {item.jogador} ({item.hora})</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  buttonGroup: {
    marginBottom: 20,
    gap: 10
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20
  }
});
