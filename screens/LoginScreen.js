import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { CLIENT_ID, CLIENT_SECRET } from "@env";
import * as AuthSession from "expo-auth-session";
import { signInUser, setFollows, setAccessToken } from "../slices/userSlice";
import { useDispatch } from "react-redux";

const LoginScreen = () => {
  const [selected, setSelected] = useState("login");
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
    <View style={tw`flex flex-1 bg-black`}>
      <Image
        source={require("../assets/game/user.jpg")}
        style={tw`w-full h-90`}
      />
      <View style={tw`flex flex-1 items-center`}>
        <View style={tw`flex flex-row items-center w-full justify-evenly py-6`}>
          <TouchableOpacity onPress={() => setSelected("login")}>
            <Text
              style={tw`text-base ${
                selected === "login" ? "text-[#8756FF]" : "text-gray-300"
              }`}
            >
              로그인
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelected("signup")}>
            <Text
              style={tw`text-base ${
                selected === "signup" ? "text-[#8756FF]" : "text-gray-300"
              }`}
            >
              회원가입
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={tw`w-full flex items-center mt-4 pb-28`}
        >
          <View>
            <Text style={tw`text-base font-semibold text-gray-300`}>
              아이디
            </Text>
            <TextInput
              style={tw`w-80 h-10 bg-transparent border border-[#8758FF] rounded-lg mt-2 mb-4 px-2 py-2 text-white`}
              autoComplete="false"
              placeholderTextColor={"#ccc"}
            />
          </View>
          <View>
            <Text style={tw`text-base font-semibold text-gray-300`}>
              비밀번호
            </Text>
            <TextInput
              style={tw`w-80 h-10 bg-transparent border border-[#8758FF] rounded-lg mt-2 mb-4 px-2 py-2 text-white`}
              autoComplete="false"
              placeholderTextColor={"#ccc"}
            />
          </View>
          {selected === "signup" && (
            <>
              <View>
                <Text style={tw`text-base font-semibold text-gray-300`}>
                  비밀번호 확인
                </Text>
                <TextInput
                  style={tw`w-80 h-10 bg-transparent border border-[#8758FF] rounded-lg mt-2 mb-6 px-2 py-2 text-white`}
                  autoComplete="false"
                  placeholderTextColor={"#ccc"}
                />
              </View>
              <View>
                <Text style={tw`text-base font-semibold text-gray-300`}>
                  생년월일
                </Text>
                <TextInput
                  style={tw`w-80 h-10 bg-transparent border border-[#8758FF] rounded-lg mt-2 mb-6 px-2 py-2 text-white`}
                  autoComplete="false"
                  placeholderTextColor={"#ccc"}
                />
              </View>
              <View>
                <Text style={tw`text-base font-semibold text-gray-300`}>
                  전화번호
                  <Text style={tw`text-sm font-light`}>
                    {" "}
                    (인증이 필요합니다)
                  </Text>
                </Text>
                <TextInput
                  style={tw`w-80 h-10 bg-transparent border border-[#8758FF] rounded-lg mt-2 mb-6 px-2 py-2 text-white`}
                  autoComplete="false"
                  placeholderTextColor={"#ccc"}
                />
              </View>
            </>
          )}

          <View style={tw`mt-2 mb-4`}>
            <TouchableOpacity
              style={tw`w-64 bg-[#181818] py-3 my-2 flex items-center justify-center rounded-lg`}
            >
              <Text style={tw`text-gray-200 font-bold text-base`}>
                {selected === "login" ? "로그인" : "회원가입"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={signInWithTwitch}
              style={tw`w-64 bg-[#8758FF] py-3 my-2 flex items-center justify-center rounded-lg`}
            >
              <Text style={tw`text-gray-200 font-bold text-base`}>
                Twitch로 로그인하기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("navigation")}
              style={tw`my-2`}
            >
              <Text style={tw`text-[#8758FF] text-sm text-center`}>
                비회원으로 이용하기
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default LoginScreen;
