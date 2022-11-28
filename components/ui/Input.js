import { Text, TextInput, View } from "react-native";
import tw from "twrnc";

function Input({ label }) {
  return (
    <View>
      <Text style={tw`text-base font-semibold text-gray-300`}>{label}</Text>
      <TextInput
        style={tw`w-80 h-10 bg-transparent border border-[#8758FF] rounded-lg mt-2 mb-4 px-2 py-2 text-white`}
        autoComplete="false"
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor={"#ccc"}
      />
    </View>
  );
}

export default Input;
