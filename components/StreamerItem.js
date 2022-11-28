import { Image, Text, View } from "react-native";
import tw from "twrnc";
import PressableItem from "./ui/PressableItem";

function StreamerItem({ item }) {
  return (
    <View
      style={tw`flex flex-row items-center justify-between w-full h-18 bg-[#181818] rounded-lg px-4 py-2 my-2`}
    >
      <View style={tw`flex flex-row items-center`}>
        <Image source={item.imageUrl} style={tw`w-12 h-12 rounded-full mr-4`} />
        <View style={tw`min-h-10 flex justify-between`}>
          <Text style={tw`text-white font-semibold`}>{item.name}</Text>
          <View style={tw`flex flex-row items-center max-w-48`}>
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
      <PressableItem style={tw`border border-[#8758FF] px-2 py-1`}>
        <Text style={tw`text-[#8758FF]`}>Watch</Text>
      </PressableItem>
    </View>
  );
}

export default StreamerItem;
