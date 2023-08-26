import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../components/screenWrapper";
import tw from "twrnc";
import BackButton from "../components/backButton";
import { useNavigation } from "@react-navigation/native";
import { setUserLoading } from '../redux/slices/user'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/loading'
//import Snackbar from 'react-native-snackbar';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userLoading } = useSelector(state => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleSubmit = async ()=>{
    if(email && password){
        // good to go
        // navigation.goBack();
        // navigation.navigate('Home');
        
        try{
            dispatch(setUserLoading(true));
            await createUserWithEmailAndPassword(auth, email, password);
            dispatch(setUserLoading(false));
        }catch(e){
            dispatch(setUserLoading(false));
        }
    }else{
        // show error
       alert("not exist");
    }
}
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
              source={require("../assets/signup.png")}
              style={tw`h-82 w-82`}
            />
          </View>
          <View style={tw`mx-2`}>
            <Text style={tw`text-lg font-bold `}>Email ID</Text>
            <TextInput
             value={email} onChangeText={value=> setEmail(value)}
              style={tw`bg-white p-2 rounded-2xl mt-2`}
            />
            <Text style={tw`text-lg font-bold mt-2`}>Password</Text>
            <TextInput
             value={password} secureTextEntry onChangeText={value=> setPassword(value)}
              style={tw`bg-white p-2 rounded-2xl mt-2`}
            />
          </View>
          <View>
          {
                userLoading? (
                    <Loading />
                ):(
                    <TouchableOpacity onPress={handleSubmit} style={tw ` bg-green-600 my-8 rounded-full p-3 shadow-sm mx-2`}>
                        <Text style={tw `text-center text-white text-lg font-bold`}>Sign Up</Text>
                    </TouchableOpacity>
                )
            }
            
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
