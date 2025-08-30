import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import BookScreen from "./src/screens/BookScreen";
import FindingScreen from "./src/screens/FindingScreen";
import TrackScreen from "./src/screens/TrackScreen";
import ReceiptScreen from "./src/screens/ReceiptScreen";
import LoginPage from "./src/screens/login_page";
import { RootStackParamList } from "./src/types/navigation";
import { useFonts } from "expo-font";
// import Navigation from "./src/Navigation"; // if you use a navigator


const Stack = createNativeStackNavigator();





export default function App() {
  const [fontsLoaded] = useFonts({
    Geologica: require("./assets/fonts/Geologica-Regular.ttf"),
    "Geologica-Bold": require("./assets/fonts/Geologica-Bold.ttf"),
    "Geologica-Light": require("./assets/fonts/Geologica-Light.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Book" component={BookScreen} options={{ title: "Book a Fixer" }} />
        <Stack.Screen name="Finding" component={FindingScreen} options={{ title: "Finding a Pro" }} />
        <Stack.Screen name="Track" component={TrackScreen} options={{ title: "Track" }} />
        <Stack.Screen name="Receipt" component={ReceiptScreen} options={{ title: "Receipt" }} />
        <Stack.Screen name="Login" component={LoginPage} options={{ title: "Log in" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
