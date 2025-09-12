import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/TabNavigation"; // adjust path

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Suprisebutton = () => {
  const navigation = useNavigation<NavigationProp>();

  const fetchRandomMeal = async () => {
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const data = await response.json();

      if (data.meals && data.meals.length > 0) {
        const meal = data.meals[0];
        // 👉 Navigate to DetailsScreen with mealId
        navigation.navigate("DetailsScreen", { mealId: meal.idMeal });
      }
    } catch (error) {
      console.error("Error fetching random meal:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={fetchRandomMeal}>
      <Text style={styles.text}>🎲 Surprise Me!</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    margin: 10,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Suprisebutton;
