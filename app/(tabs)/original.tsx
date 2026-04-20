import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type RandomMeal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;
};

function pickIngredients(meal: RandomMeal): string[] {
  const ingredients: string[] = [];

  for (let index = 1; index <= 20; index += 1) {
    const key = `strIngredient${index}` as keyof RandomMeal;
    const value = meal[key];

    if (typeof value === 'string' && value.trim()) {
      ingredients.push(value.trim());
    }
  }

  return ingredients.slice(0, 4);
}

export default function OriginalScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meal, setMeal] = useState<RandomMeal | null>(null);
  const [reveal, setReveal] = useState(false);

  const loadChallenge = useCallback(async () => {
    setLoading(true);
    setError(null);
    setReveal(false);

    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');

      if (!response.ok) {
        throw new Error('No se pudo generar una receta aleatoria.');
      }

      const data = await response.json();
      setMeal(data.meals?.[0] ?? null);
    } catch (challengeError) {
      if (challengeError instanceof Error) {
        setError(challengeError.message);
      } else {
        setError('Error inesperado al cargar la receta.');
      }
      setMeal(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadChallenge();
  }, [loadChallenge]);

  const ingredients = meal ? pickIngredients(meal) : [];

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Original
        </ThemedText>
        <ThemedText style={styles.subtitle}>Reto: Adivina la receta por sus ingredientes</ThemedText>

        <Pressable style={styles.actionButton} onPress={loadChallenge}>
          <ThemedText style={styles.actionButtonText}>Nueva receta</ThemedText>
        </Pressable>

        {loading && (
          <ThemedView style={styles.centerBox}>
            <ActivityIndicator size="small" />
            <ThemedText>Generando reto...</ThemedText>
          </ThemedView>
        )}

        {!loading && error && (
          <ThemedView style={styles.card}>
            <ThemedText type="subtitle">Error</ThemedText>
            <ThemedText>{error}</ThemedText>
          </ThemedView>
        )}

        {!loading && !error && meal && (
          <ThemedView style={styles.card}>
            <ThemedText type="subtitle">Pistas</ThemedText>
            {ingredients.map((ingredient) => (
              <ThemedText key={ingredient} style={styles.hintText}>
                - {ingredient}
              </ThemedText>
            ))}

            <Pressable style={styles.actionButton} onPress={() => setReveal((value) => !value)}>
              <ThemedText style={styles.actionButtonText}>
                {reveal ? 'Ocultar respuesta' : 'Mostrar respuesta'}
              </ThemedText>
            </Pressable>

            {reveal && (
              <ThemedView style={styles.revealBox}>
                <Image source={{ uri: meal.strMealThumb }} style={styles.mealImage} />
                <ThemedText type="defaultSemiBold">{meal.strMeal}</ThemedText>
                <ThemedText>Categoria: {meal.strCategory}</ThemedText>
                <ThemedText>Origen: {meal.strArea}</ThemedText>
              </ThemedView>
            )}
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
  actionButton: {
    borderWidth: 1,
    borderColor: '#0a7ea4',
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#0a7ea4',
    fontWeight: '600',
  },
  centerBox: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: '#d5d5d5',
    borderRadius: 10,
    padding: 12,
    gap: 8,
  },
  hintText: {
    opacity: 0.85,
  },
  revealBox: {
    gap: 6,
  },
  mealImage: {
    width: '100%',
    height: 190,
    borderRadius: 10,
    backgroundColor: '#efefef',
  },
});
