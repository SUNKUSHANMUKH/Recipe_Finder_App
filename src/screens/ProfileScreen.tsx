import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, persistor } from '../redux/store';
import { logout } from '../redux/authSlice';
import Ionicons from "react-native-vector-icons/Ionicons";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            dispatch(logout());
            // Purge the persisted state to ensure a clean state for the next login
            persistor.purge();
          }
        }
      ]
    );
  };

  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Profile Header */}
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{user?.firstName} {user?.secondName}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Info Cards */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>First Name</Text>
            <Text style={styles.value}>{user?.firstName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Second Name</Text>
            <Text style={styles.value}>{user?.secondName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user?.email}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Date of Birth</Text>
            <Text style={styles.value}>{user?.dateOfBirth}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Gender</Text>
            <Text style={styles.value}>{user?.gender}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Token</Text>
            <Text style={styles.value}>{token}</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent:"space-between",
  },
  scrollContent: {
    padding: 20,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  email: {
    fontSize: 16,
    color: "#dcdcdc",
    marginTop: 5,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    width: "100%",
    borderRadius: 15,
    padding: 18,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#111",
    textAlign: "right",
    flexShrink: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
