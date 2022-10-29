import {
  View,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon, EyeIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { CLIENT_ID, TOKEN } from "@env";

const CategoryScreen = ({ route }) => {
  const navigation = useNavigation();
  const [game, setGame] = useState({});
  const [streams, setStreams] = useState([]);
  const [video, setVideo] = useState([]);

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

      const getVideo = await fetch(
        `https://api.twitch.tv/helix/videos?game_id=${route.params.id}`,
        {
          method: "GET",
          headers: {
            "Client-Id": CLIENT_ID,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      const video = await getVideo.json();
      console.log(video);
    };
    if (route.params.id) {
      getData();
    }
  }, [route.params.id]);

  return (
    <View style={tw`flex flex-1 bg-black`}>
      {game ? (
        <>
          <View style={tw`relative w-full h-72`}>
            <Image
              source={require("../assets/game/dota2.jpg")}
              style={tw`w-full h-72 opacity-70`}
            />
            <View
              style={tw`absolute top-14 w-full flex flex-row items-center justify-between px-4 pb-2`}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ChevronLeftIcon color="#f4f4f4" size={24} />
              </TouchableOpacity>
              <TouchableOpacity>
                <HeartIcon color="#f4f4f4" size={24} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View
              style={tw`w-full py-2 px-4 flex flex-row items-center justify-between`}
            >
              <Text style={tw`text-white font-bold text-3xl`}>
                {game?.name?.toUpperCase()}
              </Text>
              <TouchableOpacity
                style={tw`w-28 bg-[#8758FF] flex items-center justify-center py-3 px-4 rounded-xl`}
              >
                <Text style={tw`text-white font-semibold`}>Following</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={tw`flex flex-1 py-4 px-2 mt-2 mb-18 bg-[#0d0d0d]`}>
            <View style={tw`py-2`}>
              <Text style={tw`text-white font-semibold text-xl`}>라이브</Text>
            </View>
            <FlatList
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              data={streams}
              renderItem={({ item }) => (
                <TouchableOpacity style={tw`flex flex-row w-full items-center`}>
                  <View style={tw`relative w-48 h-32 my-2 mr-3`}>
                    <Image
                      source={{
                        uri: item.thumbnail_url
                          ?.replace("{width}", 192)
                          .replace("{height}", 128),
                      }}
                      style={tw`w-48 h-32 rounded-lg`}
                    />
                    <View style={tw`absolute top-3 left-2`}>
                      <View
                        style={tw`bg-red-500 border border-red-500 px-2 py-1 rounded-lg`}
                      >
                        <Text style={tw`text-white`}>LIVE</Text>
                      </View>
                    </View>
                  </View>
                  <View style={tw`h-32 py-2 flex w-40`}>
                    <Text
                      style={tw`text-white text-base font-semibold whitespace-nowrap h-6 overflow-hidden`}
                    >
                      {item.title}
                    </Text>
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
                    <Text style={tw`text-white font-base`}>
                      {item.user_name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
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
