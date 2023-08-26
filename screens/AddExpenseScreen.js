import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import tw from 'twrnc'
import BackButton from '../components/backButton'
import { useNavigation } from '@react-navigation/native'
import { categories } from '../constants/index'
import {addDoc} from "firebase/firestore";
import {expensesRef} from "../config/firebase";
import Loading from "../components/loading";


export default function AddExpenseScreen(props) {
  let {id} = props.route.params;
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleExpense = async () => {
    if (title && amount && category) {
      setLoading(true);
    let doc = await addDoc(expensesRef,{
      title,amount,category,tripID:id
    })
      setLoading(false);
      if(doc && doc.id) navigation.goBack();
    } else {
alert("enter valid data")
    }
  }
  return (
    <ScreenWrapper>
      <View style={tw`flex justify-between mx-4 h-full`}>
        <View>
          <View style={tw`relative mt-5`}>
            <View style={tw`absolute top-0 left-0`}>
            <BackButton/>
            </View >
            <Text style={tw` text-gray-600 text-xl font-bold text-center`}>Add Trip</Text>
          </View>
          <View style={tw`flex-row justify-center my-3 mt-8 bg-pink-200 rounded-2xl`}>
            <Image source={require('../assets/expenseBanner.png')} style={tw`h-72 w-72`} />
          </View>
          <View style={tw`mx-2 mt-8`}>
            <Text style={tw`text-lg font-bold `}>For What</Text>
            <TextInput value={title} onChangeText={value => setTitle(value)} style={tw`bg-white p-2 rounded-2xl mt-2`} />
            <Text style={tw`text-lg font-bold mt-2`}>How Much</Text>
            <TextInput value={amount} onChangeText={value => setAmount(value)} style={tw`bg-white p-2 rounded-2xl mt-2`} />
          </View>
          <View>
            {
              loading? (
                  <Loading />
              ):(
                  <TouchableOpacity onPress={handleExpense} style={tw`my-6 rounded-full p-3 shadow-sm mx-2 bg-green-500`}>
                    <Text style={tw`text-center text-white text-lg font-bold`}>Add Expense</Text>
                  </TouchableOpacity>
              )
            }
          </View>
          <View style={tw`mx-2 `}>
            <Text style={tw`text-lg font-bold`}>Category</Text>
            <View style={tw`flex-row flex-wrap gap-2 items-center mt-2`}>
              {
                categories.map(cat => {
                  let bgColor = 'bg-white';
                  if (cat.value == category) bgColor = 'bg-green-200'
                  return (
                    <TouchableOpacity onPress={()=> setCategory(cat.value)} key={cat.value} style={tw`rounded-full bg-white px-4 p-3 mb-2 mr-2  ${bgColor}`}>
                      <Text>{cat.title}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
        </View>

      </View>
    </ScreenWrapper>
  )
}