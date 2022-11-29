import { SafeAreaView, View, Image, Text, FlatList } from "react-native";
import React from "react";
import tw from "twrnc";
import Header from "../components/ui/Header";
import Title from "../components/ui/Title";
import PressableItem from "../components/ui/PressableItem";

const SearchResultScreen = ({ route }) => {
  return (
    <SafeAreaView style={tw`flex flex-1 bg-black`}>
      <Header />

      <View style={tw`py-4 px-2`}>
        <Text style={tw`text-white text-lg text-center`}>
          검색어{" "}
          <Text
            style={tw`font-semibold text-xl`}
          >{`"${route.params.query}"`}</Text>{" "}
          에 대한 검색결과
        </Text>
      </View>

      <FlatList
        ListHeaderComponent={
          <View style={tw`py-4 px-2 w-full`}>
            <View style={tw`py-2`}>
              <Title>게임</Title>
            </View>
            {route.params.games.length > 0 ? (
              <FlatList
                numColumns={2}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                data={route.params.games}
                renderItem={({ item }) => (
                  <PressableItem style={tw`flex-1 mx-2 my-1`}>
                    <View
                      style={tw`flex-1 items-center justify-center bg-[#181818] rounded-lg px-2 py-2`}
                    >
                      <Text style={tw`text-white font-semibold text-center`}>
                        {item.name}
                      </Text>
                    </View>
                  </PressableItem>
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
        }
        ListFooterComponent={
          <View style={tw`py-4 px-2`}>
            <View style={tw`py-2`}>
              <Title>스트리머</Title>
            </View>
            {route.params.streamers.length > 0 ? (
              <FlatList
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
                    <PressableItem
                      style={tw`border border-[#8758FF] px-2 py-1`}
                    >
                      <Text style={tw`text-[#8758FF]`}>Watch</Text>
                    </PressableItem>
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
        }
      />
    </SafeAreaView>
  );
};

export default SearchResultScreen;
