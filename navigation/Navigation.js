import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import StreamingScreen from "../screens/StreamingScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import ChatScreen from "../screens/ChatScreen";
import {
  PuzzlePieceIcon as PuzzleOutlineIcon,
  TvIcon as TvOutlineIcon,
  MagnifyingGlassCircleIcon as MagnifyingOutlineIcon,
  ChatBubbleBottomCenterTextIcon as ChatOutlineIcon,
} from "react-native-heroicons/outline";
import {
  PuzzlePieceIcon as PuzzleSolidIcon,
  TvIcon as TvSolidIcon,
  MagnifyingGlassCircleIcon as MagnifyingSolidIcon,
  ChatBubbleBottomCenterTextIcon as ChatSolidIcon,
} from "react-native-heroicons/solid";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "home") {
            return focused ? (
              <PuzzleSolidIcon color={color} size={28} />
            ) : (
              <PuzzleOutlineIcon color={color} size={28} />
            );
          } else if (route.name === "streaming") {
            return focused ? (
              <TvSolidIcon color={color} size={28} />
            ) : (
              <TvOutlineIcon color={color} size={28} />
            );
          } else if (route.name === "discover") {
            return focused ? (
              <MagnifyingSolidIcon color={color} size={28} />
            ) : (
              <MagnifyingOutlineIcon color={color} size={28} />
            );
          } else if (route.name === "chat") {
            return focused ? (
              <ChatSolidIcon color={color} size={28} />
            ) : (
              <ChatOutlineIcon color={color} size={28} />
            );
          }
        },
        tabBarActiveTintColor: "#8758FF",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#0d0d0d",
          borderRadius: 15,
          height: 70,
          borderTopWidth: 0,
          paddingTop: 24,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="streaming" component={StreamingScreen} />
      <Tab.Screen name="discover" component={DiscoverScreen} />
      <Tab.Screen name="chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}
