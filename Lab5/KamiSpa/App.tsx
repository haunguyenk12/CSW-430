/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import {
  SafeAreaProvider,

} from 'react-native-safe-area-context';
import React from 'react';
import AppComponent from './App';
function App() {


  return (
    <SafeAreaProvider>
      <AppComponent />
    </SafeAreaProvider>
  );
}




export default App;
