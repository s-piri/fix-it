import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import BookScreen from "./src/screens/BookScreen";
import FindingScreen from "./src/screens/FindingScreen";
import TrackScreen from "./src/screens/TrackScreen";
import ReceiptScreen from "./src/screens/ReceiptScreen";
import LoginPage from "./src/screens/login_page";
import { RootStackParamList } from "./src/types/navigation";


const Stack = createNativeStackNavigator();

export default function App() {
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
