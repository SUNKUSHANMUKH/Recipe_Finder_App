import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useFavorites } from "./FavoritesContext";

const FavouritePage: React.FC = () => {
  const { favourites, toggleFavourite } = useFavorites();

  const renderFavCard = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.strMealThumb }} style={styles.image} />
      <View style={styles.cardFooter}>
        <Text style={styles.mealName}>{item.strMeal}</Text>
        <TouchableOpacity onPress={() => toggleFavourite(item)}>
          <Icon name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>

  );

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>My Favourites...</Text>
      {favourites.length === 0 ? (
        <Text style={styles.emptyText}>No favourites added yet!!</Text>
      ) : (
        <FlatList
          data={favourites}
          renderItem={renderFavCard}
          keyExtractor={(item) => item.idMeal}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 30,
    marginLeft: 10,

  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#1f2a40', // This sets the entire page background to black
  },
  emptyText: {
    color: "#e7e3e3ff",
    textAlign: "center",
    marginTop: 50,
    fontSize: 16
  },
  card: {
    backgroundColor: "#000000ff", // This is the background for each card item
    borderRadius: 15,
    marginVertical: 10,
    overflow: "hidden",
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 30,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  mealName: { color: "#fff", fontSize: 18, fontWeight: "600" },
});

export default FavouritePage;