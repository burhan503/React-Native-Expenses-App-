import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import EmptyList from '../components/emptyList';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import BackButton from '../components/backButton';
import ExpenseCard from '../components/expenseCard';
import { getDocs, query, where } from 'firebase/firestore';
import {expensesRef, tripsRef} from '../config/firebase';
import tw from "twrnc";
import {useSelector} from "react-redux";
let items = [
  {
    id: 1,
    title: 'Burhan',
    price: '300 US Doller',
    desc: "FrontEnd Developer",
  },
  {
    id: 2,
    title: 'Asnain',
    price: '300 US Doller',
    desc: "React Native Developer",

  },
  {
    id: 3,
    title: 'Rahil',
    price: '350 US Doller',
    desc: "Associate Java Developer",

  },
  {
    id: 4,
    title: 'Tariq',
    price: '400 US Doller',
    desc: "Python",

  },
  {
    id: 5,
    title: 'Hashim',
    price: '30 US Doller',
    desc: "Hospitality",

  },
  {
    id: 6,
    title: 'Aman',
    price: '900 US Doller',
    desc: "Senior Teacher",

  },
  {
    id: 7,
    title: 'Naaz',
    price: '38K Indian Rupee',
    desc:"Graphic Design"

  },
  {
    id: 8,
    title: 'Saad',
    price: '5 Indian Rupee',
    desc:"Student"

  },
]
export default function TripExpensesScreen(props) {
    const {id, place, country} = props.route.params;
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [expenses, setExpenses] = useState([])

    // const {user} = useSelector(state => state.user);
    const fetchExpenses = async () => {
        const q = query(expensesRef, where("tripID","==", id));
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach(doc=>{
            console.log("document Data", doc.data())
            data.push({...doc.data(), id: doc.id})
        })
        setExpenses(data)
    }
    useEffect(()=>{
        if(isFocused)
            fetchExpenses()
    },[isFocused])
  return (
    <ScreenWrapper style={tw`flex-1`}>

      {/* Top Banner Start */}
      <View style={tw `px-4`}>
      <View style={tw`relative mt-5`}>
            <View style={tw`absolute top-0 left-0`}>
              <BackButton/>
            </View >
            <View >
            <Text style={tw` text-gray-600 text-xl font-bold text-center`}>{place}</Text>
            <Text style={tw` text-gray-600 text-xs font-bold text-center`}>{country}</Text>
            </View>
          </View>
      
      </View>
      {/* Top Banner Ended */}
      <View style={tw`flex-row justify-center bg-white items-center rounded-xl mx-4 mb-4 mt-12`}>
        <Image source={require('../assets/77777.png')} style={tw`w-80 h-60`} />
      </View>
      {/* Center 1  Recent Post Start */}
      <View style={tw`px-4`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-gray-600 font-bold text-xl`}>Expenses</Text>
          <TouchableOpacity onPress={()=> navigation.navigate('AddExpense', {id, place, country})}
                            style={tw`p-2 px-3 bg-white border  border-gray-200 rounded-full`}>
            <Text>Add Expenses</Text>
          </TouchableOpacity>
        </View>
          <View style={{height: 430}}>
              <FlatList
                  data={expenses}
                  ListEmptyComponent={<EmptyList message={"You haven't recorded any expenses yet"} />}
                  keyExtractor={item=> item.id}
                  showsVerticalScrollIndicator={false}
                  className="mx-1"
                  renderItem={({item})=>{
                      return (
                          <ExpenseCard item={item} />
                      )
                  }}
              />
          </View>
      </View>
    </ScreenWrapper>
  )
}