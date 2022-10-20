import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import tw from "twrnc";
import {
  BellIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
} from "react-native-heroicons/solid";

const following = [
  {
    id: "f1",
    name: "Ninja",
    game: ["Fortnite"],
    imageUrl: require("../assets/game/s8.jpeg"),
  },
  {
    id: "f2",
    name: "Pewdiepie",
    game: ["Minecraft", "Call of Duty"],
    imageUrl: require("../assets/game/s1.jpeg"),
  },
  {
    id: "f3",
    name: "Markiplier",
    game: ["Indie", "Horror"],
    imageUrl: require("../assets/game/s6.jpeg"),
  },
];

const categories = [
  {
    id: "c1",
    name: "CALLOFDUTY",
    imageUrl: require("../assets/game/callofduty.jpg"),
  },
  {
    id: "c2",
    name: "MINECRAFT",
    imageUrl: require("../assets/game/minecraft.jpg"),
  },
  {
    id: "c3",
    name: "FORTNITE",
    imageUrl: require("../assets/game/fortnite.jpg"),
  },
  { id: "c4", name: "LOL", imageUrl: require("../assets/game/lol.jpg") },
  {
    id: "c5",
    name: "LOSTARK",
    imageUrl: require("../assets/game/lostark.jpg"),
  },
  {
    id: "c6",
    name: "OVERWATCH",
    imageUrl: require("../assets/game/overwatch.jpg"),
  },
  { id: "c7", name: "PUBG", imageUrl: require("../assets/game/pubg.jpg") },
  { id: "c8", name: "ROBLOX", imageUrl: require("../assets/game/roblox.jpg") },
  {
    id: "c9",
    name: "VALORANT",
    imageUrl: require("../assets/game/valorant.jpg"),
  },
];

const live = [
  {
    id: "l1",
    channel: "VanossGaming",
    thumnail: require("../assets/game/live1.jpg"),
    imageUrl: require("../assets/game/s5.jpeg"),
    viewer: 8.1,
  },
  {
    id: "l2",
    channel: "Pewdiepie",
    thumnail: require("../assets/game/live2.jpg"),
    imageUrl: require("../assets/game/s1.jpeg"),
    viewer: 10.9,
  },
  {
    id: "l3",
    channel: "PlayOverWatch",
    thumnail: require("../assets/game/live3.jpg"),
    imageUrl: require("../assets/game/s11.jpeg"),
    viewer: 6.7,
  },
];

const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`flex flex-1 bg-black`}>
      <ScrollView>
        <View style={tw`flex flex-row items-center justify-between px-4 py-2`}>
          <Text style={tw`text-white text-lg font-bold`}>
            GAME <Text style={tw`text-[#8758FF]`}>WITH</Text>
          </Text>
          <View style={tw`flex flex-row items-center`}>
            <TouchableOpacity>
              <BellIcon color="#f4f4f4" size={24} />
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
        </View>

        <View style={tw`py-4 px-2`}>
          <View style={tw`pb-4`}>
            <Text style={tw`text-white text-lg font-semibold`}>Following</Text>
          </View>
          <FlatList
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            data={following}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={tw`h-14 w-14 mx-2 rounded-full flex items-center justify-center bg-[#8758FF]`}
              >
                <Image
                  source={item.imageUrl}
                  style={tw`h-12 w-12 mx-2 rounded-full`}
                />
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={tw`py-4 px-2`}>
          <View style={tw`flex flex-row items-center justify-between pb-4`}>
            <Text style={tw`text-white text-lg font-semibold`}>Categories</Text>
            <TouchableOpacity>
              <EllipsisHorizontalIcon color="#fff" size={28} />
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={({ item }) => (
              <TouchableOpacity style={tw`relative h-44 w-36 mx-2`}>
                <Image
                  source={item.imageUrl}
                  style={tw`w-36 h-44 rounded-xl opacity-70`}
                />
                <Text
                  style={tw`absolute bottom-4 w-full text-white font-bold text-center`}
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
              Live Channels
            </Text>
            <TouchableOpacity>
              <EllipsisHorizontalIcon color="#fff" size={28} />
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            data={live}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity style={tw`relative w-70 h-44 mx-2`}>
                  <Image
                    source={item.thumnail}
                    style={tw`w-70 h-44 rounded-md opacity-70`}
                  />
                  <View style={tw`absolute top-3 left-2 flex flex-row`}>
                    <View
                      style={tw`bg-red-500 border border-red-500 px-2 py-1 rounded-lg`}
                    >
                      <Text style={tw`text-white`}>LIVE</Text>
                    </View>
                    <View
                      style={tw`flex flex-row border border-slate-200 px-2 py-1 rounded-lg ml-2`}
                    >
                      <EyeIcon
                        color="#fff"
                        size={16}
                        style={tw`text-slate-200`}
                      />
                      <Text style={tw`text-slate-200 ml-1`}>{item.viewer}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <View
                  style={tw`w-70 h-12 px-4 py-2 mx-2 flex flex-row items-center bg-[#181818] rounded-md my-2`}
                >
                  <Image
                    source={item.imageUrl}
                    style={tw`w-8 h-8 rounded-full`}
                  />
                  <Text style={tw`text-gray-200 font-semibold ml-4`}>
                    {item.channel}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
