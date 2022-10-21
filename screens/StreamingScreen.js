import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React from "react";
import tw from "twrnc";
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";

const livestream = [
  {
    id: "l1",
    imageUrl: require("../assets/game/l1.jpg"),
  },
  {
    id: "l2",
    imageUrl: require("../assets/game/l2.jpg"),
  },
  {
    id: "l3",
    imageUrl: require("../assets/game/l3.jpg"),
  },
  {
    id: "l4",
    imageUrl: require("../assets/game/l4.jpg"),
  },
];

const games = [
  {
    id: "g1",
    game: "OVERWATCH",
    imageUrl: require("../assets/game/g1.jpg"),
  },
  {
    id: "g2",
    game: "DOTA2",
    imageUrl: require("../assets/game/g2.jpg"),
  },
  {
    id: "g3",
    game: "LOL",
    imageUrl: require("../assets/game/g3.jpg"),
  },
  {
    id: "g4",
    game: "VALORANT",
    imageUrl: require("../assets/game/g4.jpg"),
  },
  {
    id: "g5",
    game: "FORTNITE",
    imageUrl: require("../assets/game/g5.jpg"),
  },
  {
    id: "g6",
    game: "MINECRAFT",
    imageUrl: require("../assets/game/g6.jpg"),
  },
  {
    id: "g7",
    game: "CALLOFDUTY",
    imageUrl: require("../assets/game/g7.jpg"),
  },
  {
    id: "g8",
    game: "PUBG",
    imageUrl: require("../assets/game/g8.jpg"),
  },
  {
    id: "g9",
    game: "ROBLOX",
    imageUrl: require("../assets/game/g9.jpg"),
  },
];

const StreamingScreen = () => {
  return (
    <SafeAreaView style={tw`flex flex-1 bg-black`}>
      <View style={tw`flex flex-row items-center justify-between px-4 py-2`}>
        <TouchableOpacity>
          <ChevronLeftIcon color="#f4f4f4" size={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../assets/game/user.jpg")}
            style={{
              width: 40,
              height: 40,
              resizeMode: "cover",
              borderRadius: 20,
              cursor: "pointer",
              marginLeft: 16,
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={tw`py-4 px-2`}>
        <View style={tw`pb-4`}>
          <Text style={tw`text-white text-lg font-semibold`}>Watch Live</Text>
        </View>
        <View
          style={tw`flex flex-row bg-transparent border border-[#8758FF] items-center px-2 h-12 rounded-lg`}
        >
          <MagnifyingGlassIcon color="#ccc" size={18} style={tw`mx-2`} />
          <TextInput
            style={tw`w-80 h-10 bg-transparent px-2 py-2 text-white`}
            placeholder="Search live channels or streamers"
            autoComplete="false"
            placeholderTextColor={"#ccc"}
          />
        </View>
      </View>

      <View style={tw`py-4 px-2`}>
        <FlatList
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={livestream}
          renderItem={({ item }) => (
            <TouchableOpacity style={tw`relative w-70 h-44 mx-2`}>
              <Image source={item.imageUrl} style={tw`w-70 h-44 rounded-lg`} />
              <View
                style={tw`absolute top-3 left-2 bg-red-500 border border-red-500 px-2 py-1 rounded-lg`}
              >
                <Text style={tw`text-white`}>LIVE</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={tw`py-4 px-2`}>
        <FlatList
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={games}
          renderItem={({ item }) => (
            <TouchableOpacity style={tw`mx-1`}>
              <Image
                source={item.imageUrl}
                style={tw`w-16 h-16 rounded-full bg-[#0d0d0d]`}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default StreamingScreen;
