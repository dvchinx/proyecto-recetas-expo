import { useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function BuscarScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const [query, setQuery] = useState('arrabiata');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<
    Array<{
      idMeal: string;
      strMeal: string;
      strMealThumb: string;
      strCategory: string;
      strArea: string;
    }>
  >([]);

  const onSearch = async () => {
    const cleanedQuery = query.trim();

    if (!cleanedQuery) {
      setResults([]);
      setError('Escribe un nombre para buscar.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(cleanedQuery)}`
      );

      if (!response.ok) {
        throw new Error('No se pudo completar la busqueda.');
      }

      const data = await response.json();
      const meals = data.meals ?? [];

      setResults(meals);

      if (meals.length === 0) {
        setError('No se encontraron recetas con ese nombre.');
      }
    } catch (searchError) {
      if (searchError instanceof Error) {
        setError(searchError.message);
      } else {
        setError('Error inesperado en la busqueda.');
      }
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Buscar
        </ThemedText>
        <ThemedText style={styles.subtitle}>Busca recetas por nombre</ThemedText>

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Ejemplo: chicken"
          placeholderTextColor={colorScheme === 'dark' ? '#c8d0d8' : '#687076'}
          style={[styles.input, { color: Colors[colorScheme].text }]}
          autoCapitalize="none"
        />

        <Pressable style={styles.searchButton} onPress={onSearch}>
          <ThemedText style={styles.searchButtonText}>Buscar</ThemedText>
        </Pressable>

        {loading && (
          <ThemedView style={styles.centerBox}>
            <ActivityIndicator size="small" />
            <ThemedText>Consultando API...</ThemedText>
          </ThemedView>
        )}

        {!loading && error && <ThemedText style={styles.errorText}>{error}</ThemedText>}

        {!loading && results.length > 0 && (
          <ThemedView style={styles.resultsContainer}>
            {results.map((meal) => (
              <ThemedView key={meal.idMeal} style={styles.card}>
                <Image source={{ uri: meal.strMealThumb }} style={styles.mealImage} />
                <ThemedText type="defaultSemiBold">{meal.strMeal}</ThemedText>
                <ThemedText style={styles.metaText}>Categoria: {meal.strCategory}</ThemedText>
                <ThemedText style={styles.metaText}>Origen: {meal.strArea}</ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 24,
  },
  container: {
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
  searchButton: {
    borderWidth: 1,
    borderColor: '#0a7ea4',
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#0a7ea4',
    fontWeight: '600',
  },
  centerBox: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  errorText: {
    color: '#b42318',
  },
  resultsContainer: {
    gap: 12,
  },
  card: {
    borderWidth: 1,
    borderColor: '#d5d5d5',
    borderRadius: 12,
    padding: 12,
    gap: 6,
  },
  mealImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    backgroundColor: '#efefef',
  },
  metaText: {
    opacity: 0.85,
  },
});
