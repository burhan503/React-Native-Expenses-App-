import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../components/screenWrapper";
import tw from "twrnc";
import BackButton from "../components/backButton";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { addDoc } from "firebase/firestore";
import { tripsRef } from "../config/firebase";
import { useSelector } from "react-redux";

export default function AddTripScreen() {
  const [place, setPlace] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigation = useNavigation();
  const handleAddTrip = async () => {
    if (place && country) {
      setLoading(true);
      let doc = await addDoc(tripsRef, {
        place,
        country,
        userID: user.uid,
      });
      setLoading(false);
      if (doc && doc.id) {
        navigation.goBack();
      }

    } else {
      alert("Please Enter Your CCNR");
    }
  };

  return (
    <ScreenWrapper>
      <View style={tw`flex justify-between mx-4 h-full`}>
        <View>
          <View style={tw`relative mt-5`}>
            <View style={tw`absolute top-0 left-0`}>
              <BackButton />
            </View>
            <Text style={tw` text-gray-600 text-xl font-bold text-center`}>
              Add Trip
            </Text>
          </View>
          <View style={tw`flex-row justify-center my-3 mt-8`}>
            <Image
              source={require("../assets/4444.png")}
              style={tw`h-72 w-72`}
            />
          </View>
          <View style={tw`mx-2`}>
            <Text style={tw`text-lg font-bold `}>Where On Eather</Text>
            <TextInput
              value={place}
              onChangeText={(value) => setPlace(value)}
              style={tw`bg-white p-2 rounded-2xl mt-2`}
              maxLength={maxCharacterLimit}
            />

            <Text style={tw`text-lg font-bold mt-2`}>Which Country</Text>
            <TextInput
              value={country}
              onChangeText={(value) => setCountry(value)}
              style={tw`bg-white p-2 rounded-2xl mt-2`}
              maxLength={maxCharacterLimit}
            />
          </View>
          <View>
            {loading ? (
              <Loading />
            ) : (
              <TouchableOpacity
                onPress={handleAddTrip}
                style={tw`my-6 rounded-full p-3 shadow-sm bg-green-500`}
              >
                <Text style={tw`text-center text-white font-bold`}>
                  Add Trip
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
