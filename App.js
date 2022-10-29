import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import Navigation from "./navigation/Navigation";
import CategoryScreen from "./screens/CategoryScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={"login"}
      >
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="navigation" component={Navigation} />
        <Stack.Screen name="category" component={CategoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
