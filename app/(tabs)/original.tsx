import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const ENDPOINTS = [
  'https://www.themealdb.com/api/json/v1/1/categories.php',
  'https://www.themealdb.com/api/json/v1/1/random.php',
  'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
];

export default function OriginalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Original
      </ThemedText>
      <ThemedText style={styles.subtitle}>Referencias basicas de la API</ThemedText>

      <ThemedView style={styles.listContainer}>
        {ENDPOINTS.map((url) => (
          <ThemedView key={url} style={styles.card}>
            <ThemedText style={styles.url}>{url}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
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
  listContainer: {
    gap: 10,
    marginTop: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: '#d5d5d5',
    borderRadius: 10,
    padding: 12,
  },
  url: {
    fontSize: 13,
    opacity: 0.85,
  },
});
