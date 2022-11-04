import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  ScrollView,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";

const SearchResultScreen = ({ route }) => {
  const navigation = useNavigation();
  const user = useSelector(selectUser);

  return (
    <SafeAreaView style={tw`flex flex-1 bg-black`}>
      <View style={tw`flex flex-row items-center justify-between px-4 py-2`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon color="#f4f4f4" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("user")}>
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
        </TouchableOpacity>
      </View>

      <View style={tw`py-4 px-2`}>
        <Text style={tw`text-white text-lg text-center`}>
          검색어{" "}
          <Text
            style={tw`font-semibold text-xl`}
          >{`"${route.params.query}"`}</Text>{" "}
          에 대한 검색결과
        </Text>
      </View>

      <ScrollView style={tw`flex flex-1 mb-4  bg-[#0d0d0d]`}>
        <View style={tw`py-4 px-2`}>
          <View style={tw`py-2`}>
            <Text style={tw`text-white font-semibold text-xl`}>게임</Text>
          </View>
          {route.params.games.length > 0 ? (
            <FlatList
              horizontal
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              data={route.params.games}
              renderItem={({ item }) => (
                <TouchableOpacity key={item.id} style={tw`h-32 w-24 mx-2`}>
                  <Image
                    source={{ uri: item.box_art_url }}
                    style={tw`w-24 h-32 rounded-lg`}
                  />
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={tw`w-full my-2`}>
              <Text style={tw`text-gray-400 text-center`}>
                검색 결과가 없습니다.
              </Text>
            </View>
          )}
        </View>

        <View style={tw`py-4 px-2`}>
          <View style={tw`py-2`}>
            <Text style={tw`text-white font-semibold text-xl`}>스트리머</Text>
          </View>
          {route.params.streamers.length > 0 ? (
            <FlatList
              style={tw`max-h-96`}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              data={route.params.streamers}
              renderItem={({ item }) => (
                <View
                  style={tw`flex flex-row items-center justify-between w-full h-18 bg-[#181818] rounded-lg px-4 py-2 my-2`}
                >
                  <View style={tw`flex flex-row items-center`}>
                    <Image
                      source={{ uri: item.thumbnail_url }}
                      style={tw`w-12 h-12 rounded-full mr-4`}
                    />
                    <View style={tw`min-h-10 flex justify-center`}>
                      <Text
                        numberOfLines={1}
                        style={tw`text-white font-semibold`}
                      >
                        {item.display_name}
                      </Text>
                      {item.game_name && (
                        <Text
                          numberOfLines={2}
                          style={tw`max-w-48 text-[#8758FF] mr-2 mt-1`}
                        >
                          {item.game_name}
                        </Text>
                      )}
                    </View>
                  </View>
                  <TouchableOpacity
                    style={tw`border border-[#8758FF] px-2 py-1`}
                  >
                    <Text style={tw`text-[#8758FF]`}>Watch</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : (
            <View style={tw`w-full my-2`}>
              <Text style={tw`text-gray-400 text-center`}>
                검색 결과가 없습니다.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchResultScreen;
