import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState } from "react";
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

const categories = [
  {
    id: "512710",
    name: "CALLOFDUTY",
    fullName: "Call of Duty: Warzone",
    imageUrl: require("../assets/game/callofduty.jpg"),
  },
  {
    id: "29595",
    name: "DOTA2",
    fullName: "Dota 2",
    imageUrl: require("../assets/game/dota2.jpg"),
  },
  {
    id: "27471",
    name: "MINECRAFT",
    fullName: "Minecraft",
    imageUrl: require("../assets/game/minecraft.jpg"),
  },
  {
    id: "33214",
    name: "FORTNITE",
    fullName: "Fortnite",
    imageUrl: require("../assets/game/fortnite.jpg"),
  },
  {
    id: "511224",
    name: "APEXLEGENDS",
    fullName: "Apex Legends",
    imageUrl: require("../assets/game/apexlegends.jpg"),
  },
  {
    id: "21779",
    name: "LOL",
    fullName: "League of Legends",
    imageUrl: require("../assets/game/lol.jpg"),
  },
  {
    id: "515025",
    name: "OVERWATCH",
    fullName: "Overwatch 2",
    imageUrl: require("../assets/game/overwatch.jpg"),
  },
  {
    id: "32982",
    name: "GTAV",
    fullName: "Grand Theft Auto V",
    imageUrl: require("../assets/game/gtav.jpg"),
  },
  {
    id: "516575",
    name: "VALORANT",
    fullName: "VALORANT",
    imageUrl: require("../assets/game/valorant.jpg"),
  },
  {
    id: "490100",
    name: "LOSTARK",
    fullName: "Lost Ark",
    imageUrl: require("../assets/game/lostark.jpg"),
  },
];

const StreamingScreen = () => {
  const [selected, setSelected] = useState("512710");

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
          <Text style={tw`text-white text-lg font-semibold`}>
            라이브 시청하기
          </Text>
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
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelected(item.id);
              }}
              style={tw`flex items-center justify-center px-4 py-2 bg-[#181818] rounded-xl mx-1 ${
                selected === item.id ? "bg-[#8758FF]" : ""
              }`}
            >
              <Text style={tw`text-gray-200 font-semibold text-sm`}>
                {item.fullName}
              </Text>
            </TouchableOpacity>
          )}
        />
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
    </SafeAreaView>
  );
};

export default StreamingScreen;
