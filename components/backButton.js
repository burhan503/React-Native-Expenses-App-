import {Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'


export default function BackButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigation.goBack()} style={tw `hover:bg-blue-700  py-2 px-4 w-18 m-1`}>
     <AntDesign name="banckward" size={24} color="green"/>
     {/* <Text style={tw `font-bold text-white`}>Back</Text> */}
    </TouchableOpacity>
  )
}