import React, { createContext, useContext, useState, ReactNode } from "react";
import { Meal } from "../screens/types"; // make sure you have a type

type FavoritesContextType = {
  favourites: Meal[];
  toggleFavourite: (meal: Meal) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favourites, setFavourites] = useState<Meal[]>([]);

  const toggleFavourite = (meal: Meal) => {
    setFavourites((prev) =>
      prev.find((fav) => fav.idMeal === meal.idMeal)
        ? prev.filter((fav) => fav.idMeal !== meal.idMeal)
        : [...prev, meal]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used inside FavoritesProvider");
  return context;
};
