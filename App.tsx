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

interface Document {
  id: number;
  fileName: string;
  pages: number;
}

export default function App() {
  const [fileName, setFileName] = useState("");
  const [pages, setPages] = useState("");
  const [queue, setQueue] = useState<Document[]>([]);
  const [idCounter, setIdCounter] = useState(1);

  const addToQueue = () => {
    if (!fileName || !pages || isNaN(Number(pages))) {
      Alert.alert("Erro", "Preencha todos os campos corretamente!");
      return;
    }

    const newDocument: Document = {
      id: idCounter,
      fileName,
      pages: Number(pages),
    };

    setQueue([...queue, newDocument]);
    setIdCounter(idCounter + 1);
    setFileName("");
    setPages("");
  };

  const printNext = () => {
    if (queue.length === 0) {
      Alert.alert("Fila vazia", "Nenhum documento para imprimir!");
      return;
    }

    const [next, ...rest] = queue;
    setQueue(rest);
    Alert.alert(
      "Imprimindo",
      `Documento: ${next.fileName}\nPáginas: ${next.pages}`,
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fila de Impressão</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do arquivo"
        value={fileName}
        onChangeText={setFileName}
      />

      <TextInput
        style={styles.input}
        placeholder="Número de páginas"
        value={pages}
        onChangeText={setPages}
        keyboardType="numeric"
      />

      <Button title="Adicionar à fila" onPress={addToQueue} />

      <View style={{ marginVertical: 10 }}>
        <Button title="Imprimir próximo" onPress={printNext} color="#4CAF50" />
      </View>

      <Text style={styles.subtitle}>Documentos na fila:</Text>
      <FlatList
        data={queue}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            📄 {item.fileName} - {item.pages} página(s)
          </Text>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum documento na fila</Text>
        }
      />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: "600",
    color: "#444",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  item: {
    paddingVertical: 5,
    fontSize: 16,
  },
  empty: {
    fontStyle: "italic",
    color: "#777",
    marginTop: 10,
  },
});
