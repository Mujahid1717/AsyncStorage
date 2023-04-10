import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Intro from './Async/Intro';
import Login from './Async/Login';
import Contact from './Async/Contact';
import AddContact from './Async/AddContact';


const  Stack = createNativeStackNavigator ();

const App = () => {
  return (
    <NavigationContainer> 
      <Stack.Navigator>
      <Stack.Screen 
          name = "intro"
          component={Intro}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          component={Login}
          name = "login"
          options={{headerShown: false}}
        />
        <Stack.Screen 
          component={Contact}
          name = "contact"
          options={{headerShown: false}}
        />
        <Stack.Screen 
          component={AddContact}
          name = "addContact"
          options={{headerShown: false}}
        />
      </Stack.Navigator> 
    </NavigationContainer>
    
  );
};



const styles = StyleSheet.create({

});

export default App;