import { View, TouchableOpacity, Image, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon, EyeIcon } from "react-native-heroicons/outline";
import { PlayIcon } from "react-native-heroicons/solid";
import { CLIENT_ID, TOKEN } from "@env";

const StreamerScreen = ({ route }) => {
  const user = useSelector(selectUser);
  const navigation = useNavigation();
  const [channelInfo, setChannelInfo] = useState({});
  const [channelTeam, setChannelTeam] = useState({});
  const [isLive, setIsLive] = useState({});
  const [streams, setStreams] = useState([]);
  const [videos, setVideos] = useState([]);
  const [clips, setClips] = useState([]);
  const [selected, setSelected] = useState("stream");

  useEffect(() => {
    const getData = async () => {
      const getChannelInfo = await fetch(
        `https://api.twitch.tv/helix/channels?broadcaster_id=${route.params.id}`,
        {
          method: "GET",
          headers: {
            "Client-Id": CLIENT_ID,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      const channelInfo = await getChannelInfo.json();
      setChannelInfo(channelInfo.data[0]);

      const getChannelTeam = await fetch(
        `https://api.twitch.tv/helix/teams/channel?broadcaster_id=${route.params.id}`,
        {
          method: "GET",
          headers: {
            "Client-Id": CLIENT_ID,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      const channelTeam = await getChannelTeam.json();
      setChannelTeam(channelTeam.data[0]);

      const getIsLive = await fetch(
        `https://api.twitch.tv/helix/search/channels?query=${route.params.login}`,
        {
          method: "GET",
          headers: {
            "Client-Id": CLIENT_ID,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      const isLive = await getIsLive.json();
      //setIsLive(
      //  isLive.data.filter((item) => item.game_name !== "Just Chatting")[0]
      //);
      setIsLive(isLive.data[0]);

      const getStreams = await fetch(
        `https://api.twitch.tv/helix/streams?user_id=${route.params.id}`,
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

      const getVideos = await fetch(
        `https://api.twitch.tv/helix/videos?user_id=${route.params.id}`,
        {
          method: "GET",
          headers: {
            "Client-Id": CLIENT_ID,
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      const videos = await getVideos.json();
      setVideos(videos.data);

      const getClips = await fetch(
        `https://api.twitch.tv/helix/clips?broadcaster_id=${route.params.id}`,
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
    getData();
  }, []);

  return (
    <View style={tw`flex flex-1 bg-black`}>
      <View style={tw`relative h-100`}>
        <Image
          source={require("../assets/game/banner.jpeg")}
          style={tw`w-full h-100 opacity-50`}
        />
        <View
          style={tw`absolute top-14 w-full flex flex-row items-center justify-between px-4 pb-2`}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon color="#f4f4f4" size={24} />
          </TouchableOpacity>
          {user?.id && (
            <TouchableOpacity>
              <Image
                source={{ uri: user.profile_image_url }}
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
          )}
        </View>
        <View style={tw`absolute top-28 w-full`}>
          <View style={tw`w-full flex flex-row items-center justify-evenly`}>
            <View
              style={tw`flex flex-row items-center bg-[#333333] rounded-lg py-1.5 px-3`}
            >
              <View
                style={tw`w-2 h-2 ${
                  isLive?.is_live === true ? "bg-lime-200" : "bg-gray-400"
                } rounded-full mr-1`}
              />
              <Text style={tw`text-white text-sm font-semibold`}>
                {isLive?.is_live === true ? "ONLINE" : "OFFLINE"}
              </Text>
            </View>
            <Image
              source={{ uri: route.params.profile_image_url }}
              style={tw`w-32 h-32 rounded-3xl`}
            />
            <View
              style={tw`flex flex-row items-center bg-yellow-500 rounded-lg py-1.5 px-3`}
            >
              <Text style={tw`text-white text-sm font-semibold`}>
                {route.params.broadcaster_type.toUpperCase()}
              </Text>
            </View>
          </View>
          <View style={tw`my-6 w-full`}>
            <Text style={tw`text-center text-white font-bold text-2xl`}>
              {route.params.display_name}
            </Text>
          </View>
          <View style={tw`flex flex-row items-center`}>
            <View style={tw`flex-1 mx-2 flex items-center justify-center`}>
              <Text
                style={tw`text-[#8758FF] font-semibold text-base text-center`}
              >
                {channelTeam?.team_name}
              </Text>
            </View>
            <View style={tw`flex-1 mx-2 flex items-center justify-center`}>
              <Text
                style={tw`text-[#8758FF] font-semibold text-base text-center`}
              >
                {(route.params.view_count / 10000).toFixed(2)}M
              </Text>
            </View>
            <View style={tw`flex-2 mx-2 flex items-center justify-center`}>
              <Text
                style={tw`text-[#8758FF] font-semibold text-base text-center`}
              >
                {channelInfo?.game_name}
              </Text>
            </View>
          </View>
          <View style={tw`flex flex-row items-center justify-center`}>
            <View style={tw`flex-1 mx-2 flex items-center justify-center`}>
              <Text style={tw`text-gray-400 text-xs mt-1 text-center`}>
                Team
              </Text>
            </View>
            <View style={tw`flex-1 mx-2 flex items-center justify-center`}>
              <Text style={tw`text-gray-400 text-xs mt-1 text-center`}>
                View Count
              </Text>
            </View>
            <View style={tw`flex-2 mx-2 flex items-center justify-center`}>
              <Text style={tw`text-gray-400 text-xs mt-1 text-center`}>
                Game
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={tw`py-4 px-2 bg-[#0d0d0d] flex-1`}>
        <View style={tw`flex flex-row items-center justify-evenly mt-6 mb-12`}>
          <TouchableOpacity onPress={() => setSelected("stream")}>
            <Text
              style={tw`${
                selected === "stream" ? "text-[#8756FF]" : "text-gray-300"
              } text-base font-semibold`}
            >
              라이브
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelected("video")}>
            <Text
              style={tw`${
                selected === "video" ? "text-[#8756FF]" : "text-gray-300"
              } text-base font-semibold`}
            >
              비디오
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelected("clip")}>
            <Text
              style={tw`${
                selected === "clip" ? "text-[#8756FF]" : "text-gray-300"
              } text-base font-semibold`}
            >
              클립
            </Text>
          </TouchableOpacity>
        </View>

        {selected === "stream" && (
          <View style={tw`w-full flex items-center`}>
            {isLive?.is_live ? (
              <FlatList
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                data={streams}
                renderItem={({ item }) => (
                  <TouchableOpacity style={tw`relative w-92 h-52 mx-2`}>
                    <Image
                      source={{
                        uri: item?.thumbnail_url
                          ?.replace("{width}", 376)
                          .replace("{height}", 208),
                      }}
                      style={tw`w-92 h-52 rounded-2xl opacity-70`}
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
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Image
                source={{ uri: route.params.offline_image_url }}
                style={tw`w-92 h-52 rounded-2xl`}
              />
            )}
          </View>
        )}
        {selected === "video" && (
          <FlatList
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            data={videos.filter((item) => item.thumbnail_url)}
            renderItem={({ item }) => (
              <TouchableOpacity style={tw`relative w-80 h-48 mx-2`}>
                <Image
                  source={{
                    uri: item?.thumbnail_url
                      ?.replace("%{width}", 480)
                      .replace("%{height}", 272),
                  }}
                  style={tw`w-80 h-48 rounded-2xl opacity-70`}
                />
                <View style={tw`absolute top-18 left-34`}>
                  <PlayIcon color="#f4f4f4" size={32} />
                </View>
              </TouchableOpacity>
            )}
          />
        )}
        {selected === "clip" && (
          <FlatList
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            data={clips.filter((item) => item.thumbnail_url)}
            renderItem={({ item }) => (
              <TouchableOpacity style={tw`relative w-80 h-48 mx-2`}>
                <Image
                  source={{
                    uri: item?.thumbnail_url,
                  }}
                  style={tw`w-80 h-48 rounded-2xl opacity-70`}
                />
                <View style={tw`absolute top-18 left-34`}>
                  <PlayIcon color="#f4f4f4" size={32} />
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default StreamerScreen;
