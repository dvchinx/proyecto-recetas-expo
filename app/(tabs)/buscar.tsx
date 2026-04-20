import { useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function BuscarScreen() {
  const [query, setQuery] = useState('arrabiata');

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Buscar
      </ThemedText>
      <ThemedText style={styles.subtitle}>Busqueda simple por nombre</ThemedText>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Ejemplo: chicken"
        style={styles.input}
      />

      <Pressable style={styles.endpointBox}>
        <ThemedText type="defaultSemiBold">Endpoint generado</ThemedText>
        <ThemedText style={styles.endpointText}>
          {`https://www.themealdb.com/api/json/v1/1/search.php?s=${query.trim()}`}
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 56,
    gap: 14,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#c8c8c8',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  endpointBox: {
    borderWidth: 1,
    borderColor: '#d5d5d5',
    borderRadius: 12,
    padding: 12,
    gap: 6,
  },
  endpointText: {
    fontSize: 13,
    opacity: 0.85,
  },
});
