import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { getUsers } from "../services/AuthStorage"; // ⬅️ Import getUsers

type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Login">;
};

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const users = await getUsers(); // ⬅️ Now returns an array

      if (!users || users.length === 0) {
        Alert.alert("Error", "No user is registered. Please register first.");
        return;
      }

      // Find user with matching credentials
      const matchedUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (matchedUser) {
        const mockToken = "mock-auth-token-12345";
        dispatch(login({ user: matchedUser, token: mockToken }));
        Alert.alert("Success", "Login successful!");
      } else {
        Alert.alert("Error", "Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <LinearGradient
      colors={["#0f2027", "#203a43", "#2c5364"]}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image source={require("../assets/image.png")} style={styles.logo} />
        <Text style={styles.appName}>RecipeFoodApp</Text>
      </View>

      <Text style={styles.header}>Hi There!</Text>
      <Text style={styles.subHeader}>Please enter required details</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.emailInput}
        placeholder="Email address"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.emailInput}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 15 }}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={{ color: "#fff" }}>Don't have an account?</Text>
        <Text
          style={{
            color: "#00bfff",
            textDecorationLine: "underline",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          Register Here!!
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Ionicons name="logo-google" size={20} color="#fff" />
        <Text style={styles.socialText}>Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Ionicons name="logo-apple" size={20} color="#fff" />
        <Text style={styles.socialText}>Apple</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },
  header: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subHeader: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 20,
  },
  emailInput: {
    height: 50,
    width: "80%",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    color: "#fff",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1db954",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 12,
    borderRadius: 25,
    marginVertical: 8,
    width: "70%",
    justifyContent: "center",
  },
  socialText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Login;
