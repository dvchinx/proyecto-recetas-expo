import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Menu de recetas
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        API: www.themealdb.com
      </ThemedText>

      <ThemedView style={styles.resultCard}>
        <ThemedText type="subtitle">Navegacion</ThemedText>
        <ThemedText style={styles.selectedTitle}>Usa el menu inferior para cambiar de seccion:</ThemedText>
        <ThemedText style={styles.endpointText}>- Menu: pantalla principal</ThemedText>
        <ThemedText style={styles.endpointText}>- Buscar: busqueda por nombre</ThemedText>
        <ThemedText style={styles.endpointText}>- Original: endpoints base</ThemedText>
        <ThemedText style={styles.noteText}>
          No se agregaron dependencias nuevas.
        </ThemedText>
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
  resultCard: {
    borderWidth: 1,
    borderColor: '#d5d5d5',
    borderRadius: 12,
    padding: 14,
    gap: 8,
    marginTop: 8,
  },
  selectedTitle: {
    fontWeight: '600',
  },
  endpointText: {
    fontSize: 13,
    opacity: 0.85,
  },
  noteText: {
    marginTop: 4,
    opacity: 0.75,
  },
});
