import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, ScrollView, ActivityIndicator } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/TabNavigation";

type DetailsScreenRouteProp = RouteProp<RootStackParamList, "DetailsScreen">;

const DetailsScreen = () => {
  const route = useRoute<DetailsScreenRouteProp>();
  const { mealId } = route.params;

  const [meal, setMeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        const data = await response.json();
        setMeal(data.meals[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [mealId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ff6f61" />
      </View>
    );
  }

  if (!meal) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Meal not found</Text>
      </View>
    );
  }

  // Extract ingredients
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{meal.strMeal}</Text>
      <Text style={styles.category}>{meal.strCategory} | {meal.strArea}</Text>

      <Text style={styles.sectionTitle}>Ingredients</Text>
      {ingredients.map((ing, index) => (
        <Text key={index} style={styles.ingredient}>
          • {ing}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Instructions</Text>
      <Text style={styles.instructions}>{meal.strInstructions}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#141e30", padding: 16 },
  image: { width: "100%", height: 250, borderRadius: 12, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  category: { fontSize: 16, color: "#ccc", marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#ff6f61", marginTop: 20, marginBottom: 8 },
  ingredient: { fontSize: 16, color: "#fff", marginBottom: 4 },
  instructions: { fontSize: 15, color: "#ddd", lineHeight: 22 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#141e30" },
  errorText: { color: "red", fontSize: 18 },
});

export default DetailsScreen;
