import { useState, useEffect } from "react";
import { View, Image, Text, ScrollView, Pressable } from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { CLIENT_ID, CLIENT_SECRET } from "@env";
import * as AuthSession from "expo-auth-session";
import { useDispatch } from "react-redux";
import { signInUser, setFollows, setAccessToken } from "../slices/userSlice";
import Input from "../components/ui/Input";
import PressableItem from "../components/ui/PressableItem";
//import axios from "axios";

const LoginScreen = () => {
  const [selected, setSelected] = useState("login");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  /*
  useEffect(() => {
    const getAppToken = async () => {
      const res = await axios.post(
        `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`
      );
      const data = await res.data;
    };
    getAppToken();
  }, []);
  */

  const signInWithTwitch = async () => {
    const redirect_url = AuthSession.getRedirectUrl();
    const authUrl = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirect_url}&navigation&scope=user%3Aread%3Aemail+user%3Aread%3Afollows+bits%3Aread&force_verify=true`;

    const { type, params } = await AuthSession.startAsync({ authUrl: authUrl });

    if (type === "success") {
      const { code } = params;
      const getUserToken = await fetch(
        `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${redirect_url}`,
        {
          method: "POST",
        }
      );
      const data = await getUserToken.json();
      const { access_token } = data;
      dispatch(setAccessToken(access_token));

      const getUsers = await fetch("https://api.twitch.tv/helix/users", {
        method: "GET",
        headers: {
          "Client-Id": CLIENT_ID,
          Authorization: `Bearer ${access_token}`,
        },
      });
      const users = await getUsers.json();
      const user = users.data[0];
      const { id } = user;
      dispatch(signInUser(user));

      const getFollows = await fetch(
        `https://api.twitch.tv/helix/users/follows?from_id=${id}`,
        {
          method: "GET",
          headers: {
            "Client-Id": CLIENT_ID,
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const follows = await getFollows.json();
      const ids = follows.data.map((item) => `id=${item.to_id}`);
      const parameter = ids.join("&");
      const getFollowsData = await fetch(
        `https://api.twitch.tv/helix/users?${parameter}`,
        {
          method: "GET",
          headers: {
            "Client-Id": CLIENT_ID,
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const followsData = await getFollowsData.json();
      dispatch(setFollows(followsData.data));
      navigation.navigate("navigation");
    }
  };

  return (
    <View style={tw`flex-1 bg-black`}>
      <View style={tw`flex-4`}>
        <Image
          source={require("../assets/game/user.jpg")}
          style={tw`w-full h-full`}
        />
      </View>
      <View style={tw`flex-5 items-center`}>
        <View
          style={tw`flex-row items-center w-full justify-evenly py-5 border-b border-gray-800`}
        >
          <Pressable onPress={() => setSelected("login")}>
            <Text
              style={tw`text-base ${
                selected === "login" ? "text-[#8756FF]" : "text-gray-300"
              }`}
            >
              로그인
            </Text>
          </Pressable>
          <Pressable onPress={() => setSelected("signup")}>
            <Text
              style={tw`text-base ${
                selected === "signup" ? "text-[#8756FF]" : "text-gray-300"
              }`}
            >
              회원가입
            </Text>
          </Pressable>
        </View>

        <ScrollView
          alwaysBounceVertical={false}
          contentContainerStyle={tw`w-full flex items-center mt-4`}
        >
          <Input label="아이디" />
          <Input label="비밀번호" />
          {selected === "signup" && (
            <>
              <Input label="비밀번호 확인" />
              <Input label="생년월일" />
              <Input label="전화번호" />
            </>
          )}

          <View style={tw`mt-2 mb-14`}>
            <Pressable
              android_ripple={{ color: "#242424" }}
              style={({ pressed }) =>
                tw`w-64 bg-[#181818] py-3 my-2 flex items-center justify-center rounded-lg ${
                  pressed ? "opacity-70" : ""
                }`
              }
            >
              <Text style={tw`text-gray-200 font-bold text-base`}>
                {selected === "login" ? "로그인" : "회원가입"}
              </Text>
            </Pressable>
            <Pressable
              android_ripple={{ color: "#8756FF" }}
              onPress={signInWithTwitch}
              style={({ pressed }) =>
                tw`w-64 bg-[#8758FF] py-3 my-2 flex items-center justify-center rounded-lg ${
                  pressed ? "opacity-70" : ""
                }`
              }
            >
              <Text style={tw`text-gray-200 font-bold text-base`}>
                Twitch로 로그인하기
              </Text>
            </Pressable>
            <PressableItem
              onPress={() => navigation.navigate("navigation")}
              style={tw`my-2`}
            >
              <Text style={tw`text-[#8758FF] text-sm text-center`}>
                비회원으로 이용하기
              </Text>
            </PressableItem>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default LoginScreen;
