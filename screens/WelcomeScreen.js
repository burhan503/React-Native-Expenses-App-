import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import ScreenWrapper from "../components/screenWrapper";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation("");
  return (
    <ScreenWrapper>
      <View style={tw`h-full flex justify-around`}>
        <View style={tw `flex-row justify-center mt-10`}>
        <Image source={require('../assets/welcome.gif')} style={tw`w-97 h-97`} />
        </View>
        <View style={tw `mx-5 mb-20`}>
                    <Text style={tw `text-center font-bold mb-10 text-4xl`}>Burhan App</Text>
                <TouchableOpacity onPress={()=> navigation.navigate('SignIn')}style={tw`bg-green-500 p-3 shadow rounded-full mb-5`}>
                    <Text style={tw`text-center text-white text-lg font-bold`}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=> navigation.navigate('SignUp')} style={tw`mt-6 bg-green-500 p-3 shadow rounded-full`}>
                    <Text style={tw`text-center text-white text-lg font-bold`}>Sign Up</Text>
                </TouchableOpacity>
            </View>
      </View>
    </ScreenWrapper>
  );
}
