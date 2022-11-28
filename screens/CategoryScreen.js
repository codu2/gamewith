import { useEffect, useState } from "react";
import { View, Image, Text, FlatList, ScrollView } from "react-native";
import tw from "twrnc";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon, EyeIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { CLIENT_ID, TOKEN } from "@env";
import PressableItem from "../components/ui/PressableItem";

const CategoryScreen = ({ route }) => {
  const navigation = useNavigation();
  const [game, setGame] = useState({});
  const [selected, setSelected] = useState("live");
  const [streams, setStreams] = useState([]);
  const [clips, setClips] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const getGame = await fetch(
        `https://api.twitch.tv/helix/games?id=${route.params.id}`,
        {
          method: "GET",
          headers: {
            "Client-Id": CLIENT_ID,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      const game = await getGame.json();
      setGame(game.data[0]);

      const getStreams = await fetch(
        `https://api.twitch.tv/helix/streams?game_id=${route.params.id}`,
        {
          method: "GET",
          headers: {
            "Client-Id": CLIENT_ID,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      const streams = await getStreams.json();
      setStreams(streams.data);

      const getClips = await fetch(
        `https://api.twitch.tv/helix/clips?game_id=${route.params.id}`,
        {
          method: "GET",
          headers: {
            "Client-Id": CLIENT_ID,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      const clips = await getClips.json();
      setClips(clips.data);
    };
    if (route.params.id) {
      getData();
    }
  }, [route.params.id]);

  return (
    <View style={tw`flex-1 bg-black`}>
      {game ? (
        <>
          <View style={tw`relative w-full h-96`}>
            <Image
              source={{
                uri: game.box_art_url
                  ?.replace("{width}", 384)
                  .replace("{height}", 384),
              }}
              style={tw`w-full h-96 opacity-70`}
            />
            <View
              style={tw`absolute top-14 w-full flex-row items-center justify-between px-4 pb-2`}
            >
              <PressableItem onPress={() => navigation.goBack()}>
                <ChevronLeftIcon color="#f4f4f4" size={24} />
              </PressableItem>
              <PressableItem>
                <HeartIcon color="#f4f4f4" size={24} />
              </PressableItem>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <View
                style={tw`w-full py-3 px-2 flex flex-row items-center justify-between`}
              >
                <Text style={tw`flex-3 text-white font-bold text-3xl`}>
                  {game?.name?.toUpperCase()}
                </Text>
                <PressableItem
                  style={tw`flex-1 w-28 bg-[#8758FF] flex items-center justify-center py-3 px-4 rounded-lg ml-1`}
                >
                  <Text style={tw`text-white font-semibold`}>Following</Text>
                </PressableItem>
              </View>
            </View>
            <View
              style={tw`py-2 flex flex-row items-center justify-evenly py-4 px-2 mt-2`}
            >
              <PressableItem onPress={() => setSelected("live")}>
                <Text
                  style={tw`${
                    selected === "live" ? "text-[#8756FF]" : "text-gray-300"
                  } font-semibold text-lg mx-1`}
                >
                  라이브
                </Text>
              </PressableItem>
              <PressableItem onPress={() => setSelected("clip")}>
                <Text
                  numberOfLines={1}
                  style={tw`${
                    selected === "clip" ? "text-[#8756FF]" : "text-gray-300"
                  } font-semibold text-lg mx-1`}
                >
                  클립
                </Text>
              </PressableItem>
            </View>

            <View style={tw`flex flex-1 py-4 px-2 mt-1 mb-18 bg-[#0d0d0d]`}>
              <FlatList
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                data={selected === "live" ? streams : clips}
                renderItem={({ item }) => (
                  <PressableItem
                    style={tw`flex flex-row w-full items-center border-t border-gray-700 py-2`}
                  >
                    <View style={tw`relative w-48 h-32 my-2 mr-3`}>
                      <Image
                        source={{
                          uri: item.thumbnail_url
                            ?.replace("{width}", 192)
                            .replace("{height}", 128),
                        }}
                        style={tw`w-48 h-32 rounded-lg`}
                      />
                      {selected === "live" && (
                        <View style={tw`absolute top-3 left-2`}>
                          <View
                            style={tw`bg-red-500 border border-red-500 px-2 py-1 rounded-lg`}
                          >
                            <Text style={tw`text-white`}>LIVE</Text>
                          </View>
                        </View>
                      )}
                    </View>
                    <View style={tw`h-32 py-2 flex w-40 justify-between`}>
                      <Text
                        numberOfLines={1}
                        style={tw`text-white text-base font-semibold h-6 overflow-hidden`}
                      >
                        {item.title}
                      </Text>
                      {selected === "live" && (
                        <View style={tw`flex flex-row pt-4 pb-6`}>
                          <EyeIcon
                            color="#fff"
                            size={16}
                            style={tw`text-gray-200`}
                          />
                          <Text style={tw`text-gray-200 ml-1`}>
                            {(item.viewer_count / 1000).toFixed(2)}k Viewers
                          </Text>
                        </View>
                      )}
                      <Text
                        style={tw`text-white text-sm bg-[#181818] py-1 px-1 text-center`}
                      >
                        {selected === "live"
                          ? item.user_name
                          : item.broadcaster_name}
                      </Text>
                    </View>
                  </PressableItem>
                )}
              />
            </View>
          </ScrollView>
        </>
      ) : (
        <View style={tw`w-full h-full flex items-center justify-center`}>
          <Text style={tw`text-gray-300 font-semibold text-lg`}>
            Loading...
          </Text>
        </View>
      )}
    </View>
  );
};

export default CategoryScreen;
