import { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import tw from "twrnc";
import { EllipsisHorizontalIcon } from "react-native-heroicons/outline";
import { CLIENT_ID, TOKEN, ACCESS_TOKEN } from "@env";
import { useNavigation } from "@react-navigation/native";
import Title from "../components/ui/Title";
import SearchInput from "../components/ui/SearchInput";
import PressableItem from "../components/ui/PressableItem";
import Header from "../components/ui/Header";
import StreamerItem from "../components/StreamerItem";

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
  const navigation = useNavigation();
  const [trendingGame, setTrendingGame] = useState([]);
  const [query, setQuery] = useState("");
  const [searchGames, setSearchGames] = useState([]);
  const [searchStreamers, setSearchStreamers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const getTrendingGame = await fetch(
        "https://api.twitch.tv/helix/games/top",
        {
          method: "GET",
          headers: {
            "Client-Id": CLIENT_ID,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      const treandingGame = await getTrendingGame.json();
      const filteredGames = await treandingGame.data.filter(
        (item) =>
          item.id !== "509658" &&
          item.id !== "518203" &&
          item.id !== "29452" &&
          item.id !== "26936"
      );
      setTrendingGame(filteredGames);

      const getTopStreamers = await fetch(
        "https://api.twitch.tv/helix/bits/leaderboard?started_at=2021-01-29T00:00:00Z&period=week",
        {
          method: "GET",
          headers: {
            "Client-Id": CLIENT_ID,
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      const topStreamers = await getTopStreamers.json();
      console.log(topStreamers);
    };
    getData();
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
      setSearchStreamers(streamers.data);

      setQuery("");
      navigation.navigate("searchResult", {
        query: query,
        games: games.data,
        streamers: streamers.data,
      });
    }
  };

  return (
    <SafeAreaView style={tw`flex flex-1 bg-black`}>
      <Header />

      <View style={tw`py-4 px-2`}>
        <View style={tw`pb-4`}>
          <Title>검색하기</Title>
        </View>
        <SearchInput
          query={query}
          setQuery={setQuery}
          placeholder={"Search games or streamers"}
          onSubmit={onSubmit}
        />
      </View>

      <ScrollView>
        <View style={tw`py-4 px-2`}>
          <View style={tw`flex flex-row items-center justify-between pb-4`}>
            <Text style={tw`text-white text-lg font-semibold`}>
              인기 실시간 게임
            </Text>
            <PressableItem>
              <EllipsisHorizontalIcon color="#fff" size={28} />
            </PressableItem>
          </View>
          <FlatList
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={trendingGame}
            renderItem={({ item }) => (
              <PressableItem
                style={tw`mx-2`}
                onPress={() => navigation.navigate("category", item)}
              >
                <Image
                  source={{
                    uri: item?.box_art_url
                      ?.replace("{width}", 240)
                      .replace("{height}", 240),
                  }}
                  style={tw`w-60 h-60 rounded-xl`}
                />
              </PressableItem>
            )}
          />
        </View>

        <View style={tw`py-4 px-2 mb-16`}>
          <View style={tw`flex flex-row items-center justify-between pb-4`}>
            <Title>스트리머 순위</Title>
            <PressableItem>
              <EllipsisHorizontalIcon color="#fff" size={28} />
            </PressableItem>
          </View>
          <FlatList
            style={tw`max-h-80`}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            data={streamers}
            renderItem={({ item }) => <StreamerItem item={item} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DiscoverScreen;
