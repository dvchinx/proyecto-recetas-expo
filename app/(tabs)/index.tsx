import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type Meal = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
};

type CategoriesResponse = {
  categories: Array<{ idCategory: string }>;
};

type AreasResponse = {
  meals: Array<{ strArea: string }>;
};

type RandomMealResponse = {
  meals: Meal[];
};

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryCount, setCategoryCount] = useState(0);
  const [areaCount, setAreaCount] = useState(0);
  const [featuredMeal, setFeaturedMeal] = useState<Meal | null>(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [categoriesRes, areasRes, randomRes] = await Promise.all([
        fetch('https://www.themealdb.com/api/json/v1/1/categories.php'),
        fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list'),
        fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
      ]);

      if (!categoriesRes.ok || !areasRes.ok || !randomRes.ok) {
        throw new Error('No se pudo cargar la informacion de la API.');
      }

      const categoriesData: CategoriesResponse = await categoriesRes.json();
      const areasData: AreasResponse = await areasRes.json();
      const randomData: RandomMealResponse = await randomRes.json();

      setCategoryCount(categoriesData.categories?.length ?? 0);
      setAreaCount(areasData.meals?.length ?? 0);
      setFeaturedMeal(randomData.meals?.[0] ?? null);
    } catch (loadError) {
      if (loadError instanceof Error) {
        setError(loadError.message);
      } else {
        setError('Error inesperado al consultar TheMealDB.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Menu de recetas
        </ThemedText>
        <ThemedText style={styles.subtitle}>Dashboard simple usando TheMealDB</ThemedText>

        <ThemedView style={styles.card}>
          <ThemedText type="subtitle">Navegacion</ThemedText>
          <ThemedText style={styles.infoText}>Menu: resumen general de la API</ThemedText>
          <ThemedText style={styles.infoText}>Buscar: busqueda por nombre</ThemedText>
          <ThemedText style={styles.infoText}>Original: adivina la receta</ThemedText>
        </ThemedView>

        <Pressable style={styles.reloadButton} onPress={loadDashboard}>
          <ThemedText style={styles.reloadButtonText}>Actualizar datos</ThemedText>
        </Pressable>

        {loading && (
          <ThemedView style={styles.centerBox}>
            <ActivityIndicator size="small" />
            <ThemedText>Cargando informacion...</ThemedText>
          </ThemedView>
        )}

        {!loading && error && (
          <ThemedView style={styles.card}>
            <ThemedText type="subtitle">Error</ThemedText>
            <ThemedText>{error}</ThemedText>
          </ThemedView>
        )}

        {!loading && !error && (
          <>
            <ThemedView style={styles.card}>
              <ThemedText type="subtitle">Datos rapidos</ThemedText>
              <ThemedText style={styles.infoText}>Categorias disponibles: {categoryCount}</ThemedText>
              <ThemedText style={styles.infoText}>Areas disponibles: {areaCount}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.card}>
              <ThemedText type="subtitle">Receta destacada</ThemedText>
              <ThemedText style={styles.mealName}>{featuredMeal?.strMeal ?? 'Sin receta'}</ThemedText>
              <ThemedText style={styles.infoText}>Categoria: {featuredMeal?.strCategory ?? '-'}</ThemedText>
              <ThemedText style={styles.infoText}>Origen: {featuredMeal?.strArea ?? '-'}</ThemedText>
            </ThemedView>
          </>
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
  card: {
    borderWidth: 1,
    borderColor: '#d5d5d5',
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    opacity: 0.9,
  },
  reloadButton: {
    borderWidth: 1,
    borderColor: '#0a7ea4',
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  reloadButtonText: {
    color: '#0a7ea4',
    fontWeight: '600',
  },
  centerBox: {
    gap: 8,
    alignItems: 'center',
    paddingVertical: 8,
  },
  mealName: {
    fontWeight: '700',
    fontSize: 16,
  },
});
