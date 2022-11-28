import { Pressable } from "react-native";
import tw from "twrnc";

function PressableItem({ children, onPress, style }) {
  return (
    <Pressable
      style={({ pressed }) => [pressed && tw`opacity-70`, style]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}

export default PressableItem;
