import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator, Alert, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { login } from "../api/auth";

const LOGO = require("../../assets/logo.png");

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const handleSubmit = async () => {
    if (!username || !password) return Alert.alert("Missing info", "Enter username and password.");
    try {
      setLoading(true);
      const { user } = await login(username, password);
      
      console.log('Login successful:', user);
      
      // Store user data directly
      localStorage.setItem('user', JSON.stringify(user));
      console.log('User data stored in localStorage');
      
      // Call the onLogin callback if available
      if (route.params?.onLogin) {
        console.log('Calling onLogin callback');
        route.params.onLogin(user);
      }
      
      Alert.alert("Login successful", `Welcome, ${user.first_name || user.username}!`);
      
      // Force app reload after a short delay to ensure state updates
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (e:any) {
      console.log('Login error:', e);
      Alert.alert("Login failed", e.message ?? "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image source={LOGO} style={styles.logoImage} />
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your Username or E-mail"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Enter your Password"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <Pressable style={styles.button} onPress={handleSubmit} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Submit</Text>}
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6", justifyContent: "center", alignItems: "center", padding: 16 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 32,
    width: "100%",
    maxWidth: 384,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  logoImage: {
    width: 180,  
    height: 80,   
    resizeMode: "contain", 
  },

  header: { alignItems: "center", marginBottom: 32 },
  title: { fontSize: 24, fontWeight: "700", color: "#1F2937", marginBottom: 8 },
  form: {},
  inputGroup: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: "600", color: "#374151", marginBottom: 8 },
  input: { borderWidth: 1, borderColor: "#D1D5DB", borderRadius: 6, paddingHorizontal: 12, paddingVertical: 8, fontSize: 16, backgroundColor: "#FFFFFF" },
  button: { backgroundColor: "#00447c", paddingVertical: 12, paddingHorizontal: 16, borderRadius: 6, alignItems: "center", marginTop: 8 },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});
