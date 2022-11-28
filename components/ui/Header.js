import { Image, View } from "react-native";
import tw from "twrnc";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import PressableItem from "./PressableItem";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";

function Header() {
  const navigation = useNavigation();
  const user = useSelector(selectUser);

  return (
    <View style={tw`flex-row items-center justify-between px-4 py-2`}>
      <PressableItem onPress={() => navigation.goBack()}>
        <ChevronLeftIcon color="#f4f4f4" size={24} />
      </PressableItem>
      {user?.id && (
        <PressableItem onPress={() => navigation.navigate("user")}>
          <Image
            source={
              user
                ? { uri: user.profile_image_url }
                : require("../../assets/game/non-member.jpg")
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
        </PressableItem>
      )}
    </View>
  );
}

export default Header;
