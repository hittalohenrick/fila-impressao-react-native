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

type Tarefa = {
  id: string;
  tempo: number;
};

export default function App() {
  const [tempo, setTempo] = useState("");
  const [fila, setFila] = useState<Tarefa[]>([]);
  const [contador, setContador] = useState(1);

  const adicionarTarefa = () => {
    const tempoExec = parseInt(tempo);

    if (!tempo || isNaN(tempoExec) || tempoExec <= 0) {
      Alert.alert("Tempo inválido. Informe um valor numérico maior que 0.");
      return;
    }

    const novaTarefa: Tarefa = {
      id: `T${contador}`,
      tempo: tempoExec,
    };

    setFila([...fila, novaTarefa]);
    setContador(contador + 1);
    setTempo("");
  };

  const processarTarefa = () => {
    if (fila.length === 0) {
      Alert.alert("Nenhuma tarefa na fila!");
      return;
    }

    const [primeira, ...resto] = fila;
    Alert.alert(
      "Processando tarefa",
      `ID: ${primeira.id}\nTempo estimado: ${primeira.tempo} segundos`,
    );
    setFila(resto);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🖥️ Agendador de Tarefas</Text>

      <TextInput
        placeholder="Tempo estimado (s)"
        style={styles.input}
        value={tempo}
        onChangeText={setTempo}
        keyboardType="numeric"
      />

      <Button
        title="Agendar Tarefa"
        onPress={adicionarTarefa}
        color="#2196F3"
      />
      <Button
        title="Executar próxima"
        onPress={processarTarefa}
        color="#4CAF50"
      />

      <Text style={styles.subtitle}>Fila de tarefas:</Text>
      <FlatList
        data={fila}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Text>
            {index + 1}. {item.id} - {item.tempo}s
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
    fontSize: 24,
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
    padding: 8,
    marginVertical: 10,
    borderRadius: 5,
  },
});
