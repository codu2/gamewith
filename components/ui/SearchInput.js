import { TextInput, View } from "react-native";
import tw from "twrnc";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

function SearchInput({ query, setQuery, placeholder, onSubmit }) {
  return (
    <View
      style={tw`flex-row bg-transparent border border-[#8758FF] items-center px-2 h-12 rounded-lg`}
    >
      <MagnifyingGlassIcon color="#ccc" size={18} style={tw`mx-2`} />
      <TextInput
        style={tw`w-80 h-10 bg-transparent px-2 py-2 text-white`}
        placeholder={placeholder}
        autoComplete="false"
        placeholderTextColor={"#ccc"}
        value={query}
        onChangeText={(text) => {
          setQuery(text);
        }}
        onSubmitEditing={onSubmit}
      />
    </View>
  );
}

export default SearchInput;
