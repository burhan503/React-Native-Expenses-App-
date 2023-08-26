import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
export default function Loading() {
  return (
    <View style={tw `flex-row justify-center py-8`}>
      <Text>Loading</Text>
    </View>
  )
}