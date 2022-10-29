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

const LoginScreen = () => {
  const [selected, setSelected] = useState("login");
  const navigation = useNavigation();

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
          contentContainerStyle={tw`w-full flex items-center mt-6 pb-28`}
        >
          <View>
            <Text style={tw`text-base font-semibold text-gray-300`}>
              아이디
            </Text>
            <TextInput
              style={tw`w-80 h-10 bg-transparent border border-[#8758FF] rounded-lg mt-2 mb-6 px-2 py-2 text-white`}
              autoComplete="false"
              placeholderTextColor={"#ccc"}
            />
          </View>
          <View>
            <Text style={tw`text-base font-semibold text-gray-300`}>
              비밀번호
            </Text>
            <TextInput
              style={tw`w-80 h-10 bg-transparent border border-[#8758FF] rounded-lg mt-2 mb-6 px-2 py-2 text-white`}
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

          <TouchableOpacity
            style={tw`w-64 bg-[#181818] py-3 mt-6 mb-4 flex items-center justify-center rounded-xl`}
          >
            <Text style={tw`text-gray-200 font-bold text-base`}>
              {selected === "login" ? "로그인" : "회원가입"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("navigation")}>
            <Text style={tw`text-[#8758FF] text-sm py-2`}>
              비회원으로 이용하기
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default LoginScreen;
