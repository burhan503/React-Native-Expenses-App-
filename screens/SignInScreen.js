import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../components/screenWrapper";
import BackButton from "../components/backButton";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading";
import { setUserLoading } from "../redux/slices/user";
import tw from "twrnc";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {userLoading} = useSelector(state=> state.user);
  const handleSubmit = async () => {
    if (email && password) {
      // good to go
      // navigation.goBack();
      // navigation.navigate('Home');
      try {
        dispatch(setUserLoading(true));
        await signInWithEmailAndPassword(auth, email, password);
        dispatch(setUserLoading(false));
      } catch (e) {
        dispatch(setUserLoading(false));
      }
    } else {
      alert("Invalid details")
    }
  };
  return (
    <ScreenWrapper>
      <View style={tw`flex justify-between mx-4 h-full`}>
        <View>
          <View style={tw`relative `}>
            <View style={tw`absolute top-0 left-0`}>
              <BackButton />
            </View>
            <Text style={tw` text-gray-600 text-xl font-bold text-center`}>
              Sign In
            </Text>
          </View>
          <View style={tw`flex-row justify-center my-3 mt-8`}>
            <Image
              source={require("../assets/login.png")}
              style={tw`h-82 w-82`}
            />
          </View>
          <View style={tw`mx-2`}>
            <Text style={tw`text-lg font-bold `}>Email ID</Text>
            <TextInput
              value={email}
              onChangeText={(value) => setEmail(value)}
              style={tw`bg-white p-2 rounded-2xl mt-2`}
            />
            <Text style={tw`text-lg font-bold mt-2`}>Password</Text>
            <TextInput
              value={password}
              secureTextEntry
              onChangeText={(value) => setPassword(value)}
              style={tw`bg-white p-2 rounded-2xl mt-2`}
            />
            <TouchableOpacity style={tw`flex-row justify-end mt-5`}>
              <Text>Forget Password..!</Text>
            </TouchableOpacity>
          </View>
          <View>
            {userLoading ? (
              <Loading />
            ) : (
              <TouchableOpacity
                onPress={handleSubmit}
                style={tw`my-6 rounded-full p-3 shadow-sm bg-green-500`}
              >
                <Text style={tw`text-center text-white font-bold`}>
                  Sign In
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
