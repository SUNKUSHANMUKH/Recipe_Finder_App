import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Platform,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { saveUser } from "../services/AuthStorage"; // ✅ correct import

type RegisterScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Register">;
};

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const Register: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setusername] = useState("");
  const [secondname, setsecondname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [selectedGender, setSelectedGender] = useState("male");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handlesubmit = async () => {
    if (!username.trim()) {
      Alert.alert("Validation Error", "First name is required.");
      return;
    }
    if (!secondname.trim()) {
      Alert.alert("Validation Error", "Second name is required.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Validation Error", "Password must be at least 6 characters.");
      return;
    }

    // Build user object
    const newUser = {
      firstName: username,
      secondName: secondname,
      email,
      password, // ✅ keep password for login validation
      gender: selectedGender,
      dateOfBirth: dateOfBirth.toISOString().split("T")[0],
    };
    const mockToken = `mock-token-${Date.now()}`;

    try {
      // Save user to AsyncStorage
      await saveUser(newUser);

      // Also update Redux state (so app knows user is logged in right away)
      dispatch(login({ user: newUser, token: mockToken }));

      Alert.alert("Success", "Registration successful!");
      navigation.navigate("Login"); // ✅ send them to login screen
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Top Section: Logo */}
          <View style={styles.logoContainer}>
            <Image source={require("../assets/image.png")} style={styles.logo} />
            <Text style={styles.appName}>RecipeFoodApp</Text>
          </View>

          {/* Middle Section: Form */}
          <View style={styles.formContainer}>
            <Text style={styles.header}>Register</Text>

            <Text style={styles.user}>User Name</Text>
            <View style={styles.nameContainer}>
              <TextInput
                value={username}
                onChangeText={setusername}
                style={styles.nameInput}
                placeholder="First Name"
              />
              <TextInput
                value={secondname}
                onChangeText={setsecondname}
                style={styles.nameInput}
                placeholder="Second Name"
              />
            </View>

            <Text style={styles.user}>Email ID</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.emailInput}
              placeholder="Enter your Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.user}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setpassword}
              style={styles.emailInput}
              placeholder="Enter your Password"
              secureTextEntry
            />

            <Text style={styles.label}>Gender</Text>
            <View style={styles.radioGroup}>
              {genderOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.radioButton}
                  onPress={() => setSelectedGender(option.value)}
                >
                  <View style={styles.circle}>
                    {selectedGender === option.value && <View style={styles.checkedCircle} />}
                  </View>
                  <Text style={styles.radioLabel}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.DOB}>Date of Birth</Text>
            <Button
              title={dateOfBirth.toDateString()}
              onPress={() => setShowDatePicker(true)}
            />
            {showDatePicker && (
              <DateTimePicker
                value={dateOfBirth}
                mode="date"
                display="default"
                onChange={onChangeDate}
                maximumDate={new Date()}
              />
            )}
          </View>

          {/* Bottom Section: Submit */}
          <TouchableOpacity style={styles.button} onPress={handlesubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
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
  formContainer: {
    marginTop: 30,
  },
  header: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  user: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontWeight: "600",
    color: "#fff",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  nameInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  emailInput: {
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontWeight: "600",
    color: "#fff",
  },
  radioGroup: {
    flexDirection: "row",
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  radioLabel: {
    marginLeft: 6,
    fontSize: 16,
    color: "#fff",
  },
  circle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  checkedCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  DOB: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontWeight: "600",
    marginTop: 10,
    color: "#fff",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#00c853",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
});

export default Register;
