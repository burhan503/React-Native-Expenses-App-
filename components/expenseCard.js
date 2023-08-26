import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { categoryBG } from '../theme'

export default function ExpenseCard({item}) {
  return (
    <View style={tw `flex-row bg-green-300 items-center justify-between p-3 mb-3 rounded-xl mt-3 text-black`}>
      <Text style={tw `font-bold`}>{item.title}</Text>
      <Text style={tw `font-bold`}>{item.desc}</Text>
      <View>
        <Text>{item.price}</Text>
      </View>
    </View>
  )
}