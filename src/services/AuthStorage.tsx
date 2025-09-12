// services/AuthStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: string;
}

// Save a new user into an array
export const saveUser = async (newUser: User) => {
  try {
    const existing = await AsyncStorage.getItem("users");
    let users: User[] = existing ? JSON.parse(existing) : [];

    // Add the new user
    users.push(newUser);

    // Save back to storage
    await AsyncStorage.setItem("users", JSON.stringify(users));
  } catch (error) {
    console.error("Error saving user:", error);
  }
};

// Get all users
export const getUsers = async (): Promise<User[]> => {
  try {
    const users = await AsyncStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error("Error getting users:", error);
    return [];
  }
};

// Clear all users (optional, for logout / reset)
export const clearUsers = async () => {
  try {
    await AsyncStorage.removeItem("users");
  } catch (error) {
    console.error("Error clearing users:", error);
  }
};
