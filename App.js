import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./store";
import LoginScreen from "./screens/LoginScreen";
import Navigation from "./navigation/Navigation";
import CategoryScreen from "./screens/CategoryScreen";
import SearchResultScreen from "./screens/SearchResultScreen";
import StreamerScreen from "./screens/StreamerScreen";
import UserScreen from "./screens/UserScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={"login"}
        >
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="navigation" component={Navigation} />
          <Stack.Screen name="category" component={CategoryScreen} />
          <Stack.Screen name="searchResult" component={SearchResultScreen} />
          <Stack.Screen name="streamer" component={StreamerScreen} />
          <Stack.Screen name="user" component={UserScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
