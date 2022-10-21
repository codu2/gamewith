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
  CheckCircleIcon,
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

const livestreaming = [
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

const mostviewed = [
  {
    id: "m1",
    channel: "Minecraft",
    game: "Minecraft",
    thumnail: require("../assets/game/m1.jpg"),
    views: 533,
    description:
      "The features of Minecraft give developers a creative playground where they may produce whatever kind of material they choose. As a result, it rose to the top of the platform’s games.",
  },
  {
    id: "m2",
    channel: "Fortnite",
    game: "Fortnite",
    thumnail: require("../assets/game/m2.jpg"),
    views: 252.8,
    description:
      "Fortnite was a lot of fun to watch and play because of its cartoonish aesthetics and well-organized gameplay.",
  },
  {
    id: "m3",
    channel: "Rockstar Games",
    game: "Grand Theft Auto V",
    thumnail: require("../assets/game/m3.jpg"),
    views: 170.1,
    description:
      "What separates GTA V from other video games is its diversity. Unlike other video games, you can create different types of videos using GTA V.",
  },
  {
    id: "m4",
    channel: "Garena Free Fire Global",
    game: "Garena Free Fire",
    thumnail: require("../assets/game/m4.jpg"),
    views: 134.3,
    description:
      "Garena Free Fire is a popular Battle Royale that became the most downloaded mobile game in 2019. Being a Battle Royale, Free Fire allows players to stream their gameplay and showcase their shooting skills to the entire world.",
  },
  {
    id: "m5",
    channel: "Roblox",
    game: "Roblox",
    thumnail: require("../assets/game/m5.jpg"),
    views: 110.8,
    description:
      "Roblox is a gaming platform where users can design their games and share them with other community players.",
  },
  {
    id: "m6",
    channel: "PUBG Mobile",
    game: "PUBG Mobile",
    thumnail: require("../assets/game/m6.jpg"),
    views: 89.5,
    description:
      "In PUBG, players must engage in combat with thirty other people on a big battlefield while avoiding being eliminated by other players, just like in the vast majority of BattleRoyale games.",
  },
  {
    id: "m7",
    channel: "League of Legends",
    game: "League of Legends",
    thumnail: require("../assets/game/m7.jpg"),
    views: 77.7,
    description:
      "League of Legends is a worldwide popular game that millions of players play every day.",
  },
];

const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`flex flex-1 bg-black`}>
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

      <ScrollView>
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

        <View style={tw`py-4 px-2`}>
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
            data={livestreaming}
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
                      style={tw`flex flex-row bg-gray-500 border border-gray-500 px-2 py-1 rounded-lg ml-2`}
                    >
                      <EyeIcon
                        color="#fff"
                        size={16}
                        style={tw`text-slate-200`}
                      />
                      <Text style={tw`text-slate-200 ml-1`}>
                        {item.viewer}k
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <View
                  style={tw`w-70 h-12 px-4 py-2 mx-2 flex flex-row items-center bg-[#0d0d0d] rounded-md my-2`}
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

        <View style={tw`py-4 px-2 mb-16`}>
          <View style={tw`flex flex-row items-center justify-between pb-4`}>
            <Text style={tw`text-white text-lg font-semibold`}>
              Most Viewed Channels
            </Text>
            <TouchableOpacity>
              <EllipsisHorizontalIcon color="#fff" size={28} />
            </TouchableOpacity>
          </View>
          <FlatList
            style={tw`h-72`}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            data={mostviewed}
            renderItem={({ item }) => (
              <TouchableOpacity style={tw`w-full h-28 flex flex-row my-2`}>
                <Image
                  source={item.thumnail}
                  style={tw`w-46 h-28 rounded-sm`}
                />
                <View
                  style={tw`relative h-28 flex flex-grow bg-[#0d0d0d] pl-4 py-2`}
                >
                  <Text style={tw`text-[#8758FF] text-base font-semibold mb-2`}>
                    {item.game}
                  </Text>
                  <View style={tw`flex flex-row items-center`}>
                    <Text style={tw`text-white mr-1`}>{item.channel}</Text>
                    <CheckCircleIcon color="gray" size={12} />
                  </View>
                  <Text
                    style={tw`absolute bottom-1 text-slate-300 text-xs w-full text-right`}
                  >
                    {item.views}k
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
