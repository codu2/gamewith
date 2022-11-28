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
import {
  BellIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
} from "react-native-heroicons/solid";
import { CLIENT_ID, TOKEN } from "@env";
import { useNavigation } from "@react-navigation/native";
import { selectUser, selectFollows } from "../slices/userSlice";
import { useSelector } from "react-redux";
import Title from "../components/ui/Title";
import PressableItem from "../components/ui/PressableItem";

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

const HomeScreen = () => {
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const follows = useSelector(selectFollows);
  const [live, setLive] = useState([]);
  const [soundtrack, setSoundtrack] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const getLive = await fetch(
        `https://api.twitch.tv/helix/streams?first=5`,
        {
          method: "GET",
          headers: {
            "Client-Id": CLIENT_ID,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      const live = await getLive.json();
      setLive(live.data);

      const getSoundtrack = await fetch(
        `https://api.twitch.tv/helix/soundtrack/playlists?first=10`,
        {
          method: "GET",
          headers: {
            "Client-Id": CLIENT_ID,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      const soundtrack = await getSoundtrack.json();
      setSoundtrack(soundtrack.data);
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <View style={tw`h-14 flex-row items-center justify-between px-4 py-2`}>
        <Text style={tw`text-white text-lg font-bold`}>
          GAME <Text style={tw`text-[#8758FF]`}>WITH</Text>
        </Text>
        {user?.id && (
          <View style={tw`flex flex-row items-center`}>
            <PressableItem>
              <BellIcon color="#f4f4f4" size={24} />
            </PressableItem>
            <PressableItem onPress={() => navigation.navigate("user")}>
              <Image
                source={
                  user
                    ? { uri: user.profile_image_url }
                    : require("../assets/game/non-member.jpg")
                }
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: "cover",
                  borderRadius: 20,
                  cursor: "pointer",
                  marginLeft: 16,
                }}
              />
            </PressableItem>
          </View>
        )}
      </View>

      <View style={tw`flex-1`}>
        <ScrollView>
          {user?.id && (
            <View style={tw`py-4 px-2`}>
              <View style={tw`pb-4`}>
                <Title>팔로우한 채널</Title>
              </View>
              <FlatList
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                data={follows}
                renderItem={({ item }) => (
                  <PressableItem
                    onPress={() => navigation.navigate("streamer", item)}
                    style={tw`h-14 w-14 mx-2`}
                  >
                    <Image
                      source={{ uri: item.profile_image_url }}
                      style={tw`h-14 w-14 rounded-full`}
                    />
                  </PressableItem>
                )}
              />
            </View>
          )}

          <View style={tw`py-4 px-2`}>
            <View style={tw`flex flex-row items-center justify-between pb-4`}>
              <Title>카테고리</Title>
              <PressableItem>
                <EllipsisHorizontalIcon color="#fff" size={28} />
              </PressableItem>
            </View>
            <FlatList
              horizontal
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              data={categories}
              renderItem={({ item }) => (
                <PressableItem
                  style={tw`relative h-44 w-36 mx-2`}
                  onPress={() => navigation.navigate("category", item)}
                >
                  <Image
                    source={item.imageUrl}
                    style={tw`w-36 h-44 rounded-xl opacity-70`}
                  />
                  <Text
                    style={tw`absolute bottom-4 w-full text-white font-bold text-center`}
                  >
                    {item.name}
                  </Text>
                </PressableItem>
              )}
            />
          </View>

          <View style={tw`py-4 px-2`}>
            <View style={tw`flex flex-row items-center justify-between pb-4`}>
              <Title>실시간 라이브</Title>
              <PressableItem>
                <EllipsisHorizontalIcon color="#fff" size={28} />
              </PressableItem>
            </View>
            <FlatList
              horizontal
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              data={live}
              renderItem={({ item }) => (
                <PressableItem style={tw`relative w-72 h-44 mx-2`}>
                  <Image
                    source={{
                      uri: item.thumbnail_url
                        ?.replace("{width}", 288)
                        .replace("{height}", 176),
                    }}
                    style={tw`w-72 h-44 rounded-md opacity-70`}
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
                        {(item.viewer_count / 1000).toFixed(2)}k
                      </Text>
                    </View>
                  </View>
                </PressableItem>
              )}
            />
          </View>

          <View style={tw`py-4 px-2 mb-16`}>
            <View style={tw`flex flex-row items-center justify-between pb-4`}>
              <Title>사운드트랙 플레이리스트</Title>
              <PressableItem>
                <EllipsisHorizontalIcon color="#fff" size={28} />
              </PressableItem>
            </View>
            <FlatList
              horizontal
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              data={soundtrack}
              renderItem={({ item }) => (
                <PressableItem style={tw`w-40 h-40 mx-2`}>
                  <Image
                    source={{
                      uri: item.image_url
                        ?.replace("{width}", 160)
                        .replace("{height}", 160),
                    }}
                    style={tw`w-40 h-40 rounded-lg`}
                  />
                </PressableItem>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
