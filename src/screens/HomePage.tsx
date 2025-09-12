import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { useFavorites } from "./FavoritesContext";
import { RootStackParamList } from "../navigation/TabNavigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Meal } from "./types";

const { width } = Dimensions.get("window");

type HomePageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HomePage"
>;

const meals: Meal[] = [
  {
    strMeal: "Brown Stew Chicken",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg",
    idMeal: "52940",
  },
  {
    strMeal: "Chicken & mushroom Hotpot",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/uuuspp1511297945.jpg",
    idMeal: "52846",
  },
  {
    strMeal: "Chicken Alfredo Primavera",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg",
    idMeal: "52796",
  },
  {
    strMeal: "Chicken Basquaise",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/wruvqv1511880994.jpg",
    idMeal: "52934",
  },
  {
    strMeal: "Chicken Congee",
    strMealThumb: "https://www.themealdb.com/images/media/meals/1529446352.jpg",
    idMeal: "52956",
  },
  {
    strMeal: "Chicken Handi",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg",
    idMeal: "52795",
  },
  {
    strMeal: "Chicken Karaage",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/tyywsw1505930373.jpg",
    idMeal: "52831",
  },
  {
    strMeal: "Kentucky Fried Chicken",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/xqusqy1487348868.jpg",
    idMeal: "52813",
  },
  {
    strMeal: "Kung Pao Chicken",
    strMealThumb: "https://www.themealdb.com/images/media/meals/1525872624.jpg",
    idMeal: "52945",
  },
  {
    strMeal: "Pad See Ew",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/uuuspp1468263334.jpg",
    idMeal: "52774",
  },
  {
    strMeal: "Piri-piri chicken and slaw",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/hglsbl1614346998.jpg",
    idMeal: "53039",
  },
  {
    strMeal: "Thai Green Curry",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/sstssx1487349585.jpg",
    idMeal: "52814",
  },
];

const banners = meals.map((m) => m.strMealThumb);

const HomePage = () => {
  const [searchText, setSearchText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const bannerRef = useRef<FlatList<any>>(null);

  const { favourites, toggleFavourite } = useFavorites();
  const navigation = useNavigation<HomePageNavigationProp>();
  // const navigationProfile = useNavigation();

  // ✅ Auto-scroll banners safely
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % banners.length;
        bannerRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Filter meals dynamically
  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderMealCard = ({ item }: { item: Meal }) => {
    const isFav = favourites.some((fav: Meal) => fav.idMeal === item.idMeal);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("DetailsScreen", { mealId: item.idMeal })
        }
      >
        <Image source={{ uri: item.strMealThumb }} style={styles.mealImage} />
        <View style={styles.glassOverlay}>
          <Text style={styles.mealTitle} numberOfLines={1}>
            {item.strMeal}
          </Text>

          {/* ❤️ Favourite Toggle */}
          <TouchableOpacity onPress={() => toggleFavourite(item)}>
            <Icon
              name={isFav ? "heart" : "heart-outline"}
              size={26}
              color={isFav ? "red" : "#fff"}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={["#141e30", "#243b55"]} style={styles.gradient}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
      // behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          data={filteredMeals}
          renderItem={renderMealCard}
          keyExtractor={(item) => item.idMeal}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={
            <>
              {/* HEADER */}
              <View style={styles.header}>
                <Text style={styles.appTitle}>
                  Recipe<Text style={styles.accent}>.Food</Text>
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
                  <Icon name="person-circle-outline" size={34} color="#fff" />
                </TouchableOpacity>


              </View>

              {/* SEARCH */}
              <View style={styles.searchWrapper}>
                <Icon
                  name="search-outline"
                  size={20}
                  color="#999"
                  style={{ marginRight: 8 }}
                />
                <TextInput
                  placeholder="Search recipes..."
                  placeholderTextColor="#aaa"
                  value={searchText}
                  onChangeText={setSearchText}
                  style={styles.searchBox}
                />
              </View>

              {/* AUTO-SCROLLING BANNERS */}
              <FlatList
                data={banners}
                ref={bannerRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                  <Image source={{ uri: item }} style={styles.banner} />
                )}
                style={{ marginBottom: 20 }}
              />

              {/* SECTION HEADER */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Trending Recipes</Text>
              </View>
            </>
          }
        />
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  appTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1,
  },
  accent: {
    color: "#ff6f61",
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    marginHorizontal: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchBox: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  banner: {
    width: width * 0.9,
    height: 200,
    resizeMode: "cover",
    borderRadius: 20,
    marginHorizontal: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  card: {
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  mealImage: {
    width: "100%",
    height: 200,
  },
  glassOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 14,
    backgroundColor: "rgba(0,0,0,0.45)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
});

export default HomePage;
