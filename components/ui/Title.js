import { Text } from "react-native";
import tw from "twrnc";

function Title({ children }) {
  return <Text style={tw`text-white text-lg font-semibold`}>{children}</Text>;
}

export default Title;
