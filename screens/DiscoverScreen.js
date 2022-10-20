import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import React from "react";
import tw from "twrnc";
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
} from "react-native-heroicons/outline";

const trending = [
  {
    id: "t1",
    name: "MINECRAFT",
    imageUrl: require("../assets/game/minecraft.jpg"),
  },
  {
    id: "t2",
    name: "FORTNITE",
    imageUrl: require("../assets/game/fortnite.jpg"),
  },
  { id: "t3", name: "ROBLOX", imageUrl: require("../assets/game/roblox.jpg") },
  { id: "t4", name: "PUBG", imageUrl: require("../assets/game/pubg.jpg") },
  {
    id: "t5",
    name: "CALLOFDUTY",
    imageUrl: require("../assets/game/callofduty.jpg"),
  },
];

const streamers = [
  {
    id: "s1",
    name: "Pewdiepie",
    game: ["Minecraft", "Call of Duty"],
    imageUrl: require("../assets/game/s1.jpeg"),
  },
  {
    id: "s2",
    name: "Rubius Z",
    game: ["Fortnite"],
    imageUrl: require("../assets/game/s2.jpeg"),
  },
  {
    id: "s3",
    name: "Fernanfloo",
    game: ["Resident Evil 2"],
    imageUrl: require("../assets/game/s3.jpeg"),
  },
  {
    id: "s4",
    name: "Vegetta777",
    game: ["Minecraft", "Battlefield"],
    imageUrl: require("../assets/game/s4.jpeg"),
  },
  {
    id: "s5",
    name: "VanossGaming",
    game: ["Fortnite"],
    imageUrl: require("../assets/game/s5.jpeg"),
  },
  {
    id: "s6",
    name: "Markiplier",
    game: ["Indie", "Horror"],
    imageUrl: require("../assets/game/s6.jpeg"),
  },
  {
    id: "s7",
    name: "RezendeEvil",
    game: ["Minecraft"],
    imageUrl: require("../assets/game/s7.jpeg"),
  },
  {
    id: "s8",
    name: "Ninja",
    game: ["Fortnite"],
    imageUrl: require("../assets/game/s8.jpeg"),
  },
  {
    id: "s9",
    name: "JackSepticEye",
    game: ["Indie", "Horror"],
    imageUrl: require("../assets/game/s9.jpeg"),
  },
  {
    id: "s10",
    name: "DanTDM",
    game: ["Minecraft"],
    imageUrl: require("../assets/game/s10.jpeg"),
  },
];

const DiscoverScreen = () => {
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
          <Text style={tw`text-white text-lg font-semibold`}>Discover</Text>
        </View>
        <View
          style={tw`flex flex-row bg-transparent border border-[#8758FF] items-center px-2 h-12 rounded-lg`}
        >
          <MagnifyingGlassIcon color="#ccc" size={18} style={tw`mx-2`} />
          <TextInput
            style={tw`w-80 h-10 bg-transparent px-2 py-2 text-white`}
            placeholder="Search games or streamers"
            autoComplete="false"
            placeholderTextColor={"#ccc"}
          />
        </View>
      </View>

      <ScrollView>
        <View style={tw`py-4 px-2`}>
          <View style={tw`flex flex-row items-center justify-between pb-4`}>
            <Text style={tw`text-white text-lg font-semibold`}>
              Trending Games
            </Text>
            <TouchableOpacity>
              <EllipsisHorizontalIcon color="#fff" size={28} />
            </TouchableOpacity>
          </View>
          <FlatList
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={trending}
            renderItem={({ item }) => (
              <TouchableOpacity style={tw`relative h-40 mx-2`}>
                <Image
                  source={item.imageUrl}
                  style={tw`w-64 h-40 rounded-xl opacity-70`}
                />
                <Text
                  style={tw`absolute bottom-2 left-2 text-white font-semibold text-sm`}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={tw`py-4 px-2 mb-16`}>
          <View style={tw`flex flex-row items-center justify-between pb-4`}>
            <Text style={tw`text-white text-lg font-semibold`}>
              Top Streamers
            </Text>
            <TouchableOpacity>
              <EllipsisHorizontalIcon color="#fff" size={28} />
            </TouchableOpacity>
          </View>
          <FlatList
            style={tw`max-h-72`}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            data={streamers}
            renderItem={({ item }) => (
              <View
                style={tw`flex flex-row items-center justify-between w-full h-18 bg-[#181818] rounded-lg px-4 py-2 my-2`}
              >
                <View style={tw`flex flex-row items-center`}>
                  <Image
                    source={item.imageUrl}
                    style={tw`w-12 h-12 rounded-full mr-2`}
                  />
                  <View style={tw`h-10 flex justify-between`}>
                    <Text style={tw`text-white font-semibold`}>
                      {item.name}
                    </Text>
                    <View style={tw`flex flex-row items-center`}>
                      {item.game.map((game) => (
                        <Text
                          key={`${game}${new Date().getTime()}`}
                          style={tw`text-[#8758FF] mr-2`}
                        >
                          {game}
                        </Text>
                      ))}
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={tw`border border-[#8758FF] px-2 py-1`}>
                  <Text style={tw`text-[#8758FF]`}>Watch</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DiscoverScreen;
