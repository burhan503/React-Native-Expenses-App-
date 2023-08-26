
import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import tw from "twrnc";
import AppNavigation from './navigation/appNavigation';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
   
  );
}


export default App;