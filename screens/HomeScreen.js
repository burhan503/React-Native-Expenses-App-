import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../components/screenWrapper";
import EmptyList from "../components/emptyList";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth, tripsRef } from "../config/firebase";
import { useSelector } from "react-redux";
import { getDocs, query, where, collection } from "firebase/firestore";

import tw from "twrnc";
const items = [
  {
    id: 1,
    place: "Gujrat",
    country: "Pakistan",
  },
  {
    id: 2,
    place: "London Eye",
    country: "England",
  },
  {
    id: 3,
    place: "Washington dc",
    country: "America",
  },
  {
    id: 4,
    place: "New york",
    country: "America",
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [trips, setTrips] = useState([])
  const isFocused = useIsFocused();
  const {user} = useSelector(state => state.user);
  const fetchTrips = async () => {
    const q = query(tripsRef, where("userID","==",user.uid));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach(doc=>{
      console.log("document Data", doc.data())
      data.push({...doc.data(), id: doc.id})
    })
    setTrips(data)
  }
useEffect(()=>{
  if(isFocused)
        fetchTrips()
},[isFocused])
  const handleLogout = async () => {
    await signOut(auth);
  };
  return (
    <ScreenWrapper style={tw`flex-1`}>
      <View style={tw`flex-row justify-between items-center p-4`}>
        <Text style={tw`text-gray-600 font-bold text-2xl shadow-sm`}>
          User
        </Text>
        <TouchableOpacity
          onPress={handleLogout}
          style={tw`p-2 px-3 bg-white border border-gray-200 rounded-full`}
        >
          <Text style={tw`text-gray-600`}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View
        style={tw`flex-row justify-center bg-blue-200 items-center rounded-xl mx-4 mb-4`}
      >
        <Image source={require("../assets/banner.png")} style={tw`w-80 h-60`} />
      </View>

      <View style={tw`flex px-4 space-y-3`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-gray-600 font-bold text-xl`}>Recent Trips</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddTrip")}
            style={tw`p-2 px-3 bg-white border  border-gray-200 rounded-full`}
          >
            <Text>Add Trip</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`h-560 mt-4 mx-2 justify-center `}>
          <FlatList
            data={trips}
            numColumns={2}
            ListEmptyComponent={
              <EmptyList message={"You haven't recorded any trips yet"} />
            }
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
            style={tw`mx-1`}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("TripExpenses", { ...item })
                  }
                >
                  <View>
                    <Image
                      source={require("../assets/2.jpg")}
                      style={tw`w-36 h-36 mb-2 mt-2 rounded-lg `}
                    />
                    <Text style={tw`font-bold`}>{item.place}</Text>
                    <Text style={tw`text-xs text-ellipsis overflow-hidden`}>
                      {item.country}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
