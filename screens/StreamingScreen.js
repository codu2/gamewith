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
import { EyeIcon } from "react-native-heroicons/outline";
import { CLIENT_ID, TOKEN } from "@env";
import { useNavigation } from "@react-navigation/native";
import PressableItem from "../components/ui/PressableItem";
import Title from "../components/ui/Title";
import SearchInput from "../components/ui/SearchInput";
import Header from "../components/ui/Header";

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
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [searchGames, setSearchGames] = useState([]);
  const [searchStreamers, setSearchStreamers] = useState([]);
  const [selected, setSelected] = useState("512710");
  const [stream, setStream] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const getStream = await fetch(
        `https://api.twitch.tv/helix/streams?first=15&game_id=${selected}`,
        {
          method: "GET",
          headers: {
            "Client-Id": CLIENT_ID,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      const stream = await getStream.json();
      setStream(stream.data);
    };
    getData();
  }, [stream]);

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

      setQuery("");
      navigation.navigate("searchResult", {
        query: query,
        games: games.data,
        streamers: streamers.data,
      });
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <Header />

      <View style={tw`py-4 px-2`}>
        <View style={tw`pb-4`}>
          <Title>라이브 시청하기</Title>
        </View>
        <SearchInput
          query={query}
          setQuery={setQuery}
          placeholder={"Search live channels or streamers"}
          onSubmit={onSubmit}
        />
      </View>

      <View style={tw`py-4 px-2`}>
        <FlatList
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={({ item }) => (
            <PressableItem
              onPress={() => {
                setSelected(item.id);
              }}
              style={tw`items-center justify-center px-4 py-2 bg-[#181818] rounded-xl mx-1 ${
                selected === item.id ? "bg-[#8758FF]" : ""
              }`}
            >
              <Text style={tw`text-gray-200 font-semibold text-sm`}>
                {item.fullName}
              </Text>
            </PressableItem>
          )}
        />
      </View>

      <ScrollView style={tw`flex-1 py-4 px-2 mt-2 mb-18 bg-[#0d0d0d]`}>
        <FlatList
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          data={stream}
          renderItem={({ item }) => (
            <PressableItem style={tw`relative w-80 h-48 mx-auto my-2`}>
              <Image
                source={{
                  uri: item.thumbnail_url
                    ?.replace("{width}", 320)
                    .replace("{height}", 192),
                }}
                style={tw`w-80 h-48 rounded-lg`}
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
                  <EyeIcon color="#fff" size={16} style={tw`text-slate-200`} />
                  <Text style={tw`text-slate-200 ml-1`}>
                    {(item.viewer_count / 1000).toFixed(2)}k
                  </Text>
                </View>
              </View>
            </PressableItem>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default StreamingScreen;
