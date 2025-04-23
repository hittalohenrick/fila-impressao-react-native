import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";

type Chamada = {
  id: string;
  cliente: string;
  hora: string;
};

export default function App() {
  const [cliente, setCliente] = useState("");
  const [fila, setFila] = useState<Chamada[]>([]);
  const [contador, setContador] = useState(1);

  const formatarHora = (data: Date) => {
    return data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const adicionarChamada = () => {
    if (!cliente.trim()) {
      Alert.alert("Informe o nome do cliente!");
      return;
    }

    const novaChamada: Chamada = {
      id: `C${contador}`,
      cliente: cliente.trim(),
      hora: formatarHora(new Date()),
    };

    setFila([...fila, novaChamada]);
    setContador(contador + 1);
    setCliente("");
  };

  const atenderChamada = () => {
    if (fila.length === 0) {
      Alert.alert("Nenhuma chamada na fila!");
      return;
    }

    const [primeira, ...resto] = fila;

    Alert.alert(
      "📞 Atendendo chamada",
      `ID: ${primeira.id}\nCliente: ${primeira.cliente}\nHorário: ${primeira.hora}`,
    );

    setFila(resto);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📞 Call Center - Fila de Chamadas</Text>

      <TextInput
        placeholder="Nome do cliente"
        style={styles.input}
        value={cliente}
        onChangeText={setCliente}
      />

      <Button title="Nova chamada" onPress={adicionarChamada} color="#2196F3" />
      <Button
        title="Atender próxima"
        onPress={atenderChamada}
        color="#4CAF50"
      />

      <Text style={styles.subtitle}>Chamadas na fila:</Text>
      <FlatList
        data={fila}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Text>
            {index + 1}. {item.id} - {item.cliente} ({item.hora})
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
