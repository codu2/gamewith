import {
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { Cog6ToothIcon } from "react-native-heroicons/solid";
import { useSelector } from "react-redux";
import { selectFollows, selectUser } from "../slices/userSlice";
import { useNavigation } from "@react-navigation/native";

const UserScreen = () => {
  const user = useSelector(selectUser);
  const follows = useSelector(selectFollows);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`flex flex-1 bg-black`}>
      <View style={tw`flex flex-row items-center justify-between px-4 py-2`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon color="#f4f4f4" size={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Cog6ToothIcon color="#f4f4f4" size={24} />
        </TouchableOpacity>
      </View>

      <View style={tw`py-4 px-2`}>
        <View style={tw`w-full flex items-center justify-center`}>
          <Image
            source={{ uri: user?.profile_image_url }}
            style={tw`w-44 h-44 rounded-full`}
          />
        </View>
        <View style={tw`flex flex-row mt-8 w-full justify-center`}>
          <View>
            <Text
              style={tw`text-white font-semibold text-base h-8 w-28 py-1 px-2`}
            >
              name
            </Text>
            <Text
              style={tw`text-white font-semibold text-base h-8 w-28 py-1 px-2`}
            >
              email
            </Text>
            <Text
              style={tw`text-white font-semibold text-base h-8 w-28 py-1 px-2`}
            >
              created_at
            </Text>
          </View>
          <View>
            <Text style={tw`text-white font-semibold text-base h-8 py-1 px-2`}>
              {user?.display_name}
            </Text>
            <Text style={tw`text-white font-semibold text-base h-8 py-1 px-2`}>
              {user?.email}
            </Text>
            <Text style={tw`text-white font-semibold text-base h-8 py-1 px-2`}>
              {new Date(user?.created_at).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>

      <View style={tw`py-4 px-2`}>
        <View style={tw`my-1`}>
          <Text style={tw`text-white text-lg`}>팔로잉</Text>
        </View>
        <FlatList
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          data={follows}
          renderItem={({ item }) => (
            <View
              style={tw`flex flex-row items-center justify-between w-full h-15 bg-[#181818] rounded-lg px-4 py-2 my-2`}
            >
              <View style={tw`flex flex-row items-center`}>
                <Image
                  source={{ uri: item.profile_image_url }}
                  style={tw`w-12 h-12 rounded-full mr-4`}
                />
                <View style={tw`flex justify-between`}>
                  <Text style={tw`text-white font-semibold`}>
                    {item.display_name}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={tw`border border-[#8758FF] px-2 py-1`}
                onPress={() => navigation.navigate("streamer", item)}
              >
                <Text style={tw`text-[#8758FF]`}>Watch</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserScreen;
