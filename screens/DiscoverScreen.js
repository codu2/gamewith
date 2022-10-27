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
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
} from "react-native-heroicons/outline";
import { CLIENT_ID, TOKEN } from "@env";

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
  const [trendingGame, setTrendingGame] = useState([]);
  const [query, setQuery] = useState("");
  const [searchGames, setSearchGames] = useState([]);
  const [searchStreamers, setSearchStreamers] = useState([]);

  useEffect(() => {
    const getTrendingGame = async () => {
      const res = await fetch("https://api.twitch.tv/helix/games/top", {
        method: "GET",
        headers: {
          "Client-Id": CLIENT_ID,
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await res.json();
      const filteredGames = await data.data.filter(
        (item) =>
          item.id !== "509658" &&
          item.id !== "518203" &&
          item.id !== "29452" &&
          item.id !== "26936"
      );
      setTrendingGame(filteredGames);
    };
    getTrendingGame();
  }, []);

  const onSubmit = async () => {
    if (query) {
      const searchGames = await fetch(
        `https://api.twitch.tv/helix/search/categories?query=${query}`,
        {
          method: "GET",
          headers: {
            "Client-Id": CLIENT_ID,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      const games = await searchGames.json();
      setSearchGames(games.data);

      const searchStreamers = await fetch(
        `https://api.twitch.tv/helix/search/channels?query=${query}`,
        {
          method: "GET",
          headers: {
            "Client-Id": CLIENT_ID,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      const streamers = await searchStreamers.json();
      setSearchStreamers(streamers);
    }
  };

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
          <Text style={tw`text-white text-lg font-semibold`}>검색하기</Text>
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
            value={query}
            onChangeText={(text) => {
              setQuery(text);
            }}
            onSubmitEditing={onSubmit}
          />
        </View>
      </View>

      <ScrollView>
        <View style={tw`py-4 px-2`}>
          <View style={tw`flex flex-row items-center justify-between pb-4`}>
            <Text style={tw`text-white text-lg font-semibold`}>
              인기 실시간 게임
            </Text>
            <TouchableOpacity>
              <EllipsisHorizontalIcon color="#fff" size={28} />
            </TouchableOpacity>
          </View>
          <FlatList
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={trendingGame}
            renderItem={({ item }) => (
              <TouchableOpacity style={tw`mx-2`}>
                <Image
                  source={{
                    uri: item?.box_art_url
                      ?.replace("{width}", 240)
                      .replace("{height}", 240),
                  }}
                  style={tw`w-60 h-60 rounded-xl`}
                />
              </TouchableOpacity>
            )}
          />
        </View>
        {/*240X160 */}

        <View style={tw`py-4 px-2 mb-16`}>
          <View style={tw`flex flex-row items-center justify-between pb-4`}>
            <Text style={tw`text-white text-lg font-semibold`}>
              스트리머 순위
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
