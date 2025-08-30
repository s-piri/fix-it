import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import BookScreen from "./src/screens/BookScreen";
import FindingScreen from "./src/screens/FindingScreen";
import TrackScreen from "./src/screens/TrackScreen";
import ReceiptScreen from "./src/screens/ReceiptScreen";
import LoginPage from "./src/screens/login_page";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Geologica: require("./assets/fonts/Geologica-Regular.ttf"),
    "Geologica-Bold": require("./assets/fonts/Geologica-Bold.ttf"),
    "Geologica-Light": require("./assets/fonts/Geologica-Light.ttf"),
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication status on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      // Check if user is logged in (stored in localStorage)
      const user = localStorage.getItem('user');
      if (user) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    try {
      // Store user data
      localStorage.setItem('user', JSON.stringify(userData));
      setIsAuthenticated(true);
    } catch (error) {
      console.log('Error saving user data:', error);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('user');
      setIsAuthenticated(false);
    } catch (error) {
      console.log('Error removing user data:', error);
    }
  };

  if (!fontsLoaded || loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  console.log('Current auth state:', { isAuthenticated, loading });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          // Show login page if not authenticated
          <Stack.Screen 
            name="Login" 
            component={LoginPage} 
            options={{ headerShown: false }}
            initialParams={{ onLogin: handleLogin }}
          />
        ) : (
          // Show main app screens if authenticated
          <>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ headerShown: false }}
              initialParams={{ onLogout: handleLogout }}
            />
            <Stack.Screen name="Book" component={BookScreen} options={{ title: "Book a Fixer" }} />
            <Stack.Screen name="Finding" component={FindingScreen} options={{ title: "Finding a Pro" }} />
            <Stack.Screen name="Track" component={TrackScreen} options={{ title: "Track" }} />
            <Stack.Screen name="Receipt" component={ReceiptScreen} options={{ title: "Receipt" }} />
            <Stack.Screen name="Login" component={LoginPage} options={{ title: "Log in" }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
