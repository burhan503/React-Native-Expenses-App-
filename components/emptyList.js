import { View, Text, Image } from "react-native";
import React from "react";
import tw from "twrnc";
export default function EmptyList({ message }) {
  return (
    <View style={tw`flex justify-center items-center my-5`}>
      <Image
        style={tw`w-36 h-36 shadow`}
        source={require("../assets/empty.png")}
      />
      <Text style={tw`font-bold text-gray-400`}>
        {message || "data not found"}
      </Text>
    </View>
  );
}
