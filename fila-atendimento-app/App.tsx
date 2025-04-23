import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";

type Cliente = {
  id: string;
  nome: string;
  horario: string;
};

export default function App() {
  const [fila, setFila] = useState<Cliente[]>([]);
  const [nome, setNome] = useState("");
  const [contador, setContador] = useState(1);

  const adicionarCliente = () => {
    if (!nome.trim()) {
      Alert.alert("Erro", "Digite o nome do cliente.");
      return;
    }

    const novoCliente: Cliente = {
      id: `Senha ${contador}`,
      nome: nome.trim(),
      horario: new Date().toLocaleTimeString(),
    };

    setFila([...fila, novoCliente]);
    setContador(contador + 1);
    setNome("");
  };

  const atenderCliente = () => {
    if (fila.length === 0) {
      Alert.alert("Fila vazia", "Nenhum cliente para atender.");
      return;
    }

    const [clienteAtual, ...resto] = fila;
    Alert.alert(
      "Atendimento realizado",
      `✅ ${clienteAtual.nome} (${clienteAtual.id})\nChegou às ${clienteAtual.horario}`,
    );
    setFila(resto);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧾 Fila de Atendimento</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome do cliente"
        value={nome}
        onChangeText={setNome}
      />
      <Button title="Adicionar à fila" onPress={adicionarCliente} />

      <View style={{ marginTop: 10 }}>
        <Button
          title="Atender próximo cliente"
          color="#4CAF50"
          onPress={atenderCliente}
        />
      </View>

      <Text style={styles.subtitle}>Clientes na fila:</Text>
      <FlatList
        data={fila}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Text>
            {index + 1}. {item.nome} - {item.id} - {item.horario}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
});
