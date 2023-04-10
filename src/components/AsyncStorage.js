import { StyleSheet, Text, View,SafeAreaView  } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const App = () => {
  const [text,setText]= useState('')
  const [savedText,setSavedText] = useState('')

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('TEXT', text)
      // console.log("stored",{text})
    } catch (e) {
      // saving error
    }
  }
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('TEXT')
      if(value !== null) {
        setSavedText(value)
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }
  

  return (
    <View style={styles.container}>
      <SafeAreaView>
      <Text style={styles.headerText}>Contact App</Text>
      <TextInput
       placeholder = 'Enter Name' 
       style={styles.inputStyle}
       onChangeText = {text => setText(text)}
       />
      <TouchableOpacity style={styles.btn1}
        onPress = {()=>{storeData()}}
      >
        <Text style={styles.btn1Text}>Save Data</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn1}
      onPress = {()=>{getData()}}
      >
        <Text style={styles.btn1Text}>Show Data</Text>
      </TouchableOpacity>
      <Text style={styles.saveText}>{"Saved Text:" + savedText}</Text>
      </SafeAreaView>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
  },
  inputStyle:{
    borderColor:'black',
    fontSize:20,
    borderWidth:1,
    height:55,
    paddingHorizontal:10,
    color:'grey',
    borderRadius:10
  },
  headerText:{
    fontFamily:'CartoonQueen',
    fontSize:30,
    marginVertical:20,
    marginHorizontal:50
    
  },
  btn1:{
      backgroundColor:'black',
      height:50,
      width:250,
      alignItems:'center',
      marginTop:20,
      borderRadius:10,
      justifyContent:'center',
      marginHorizontal:50
      
  },
  btn1Text:{
    fontWeight:'bold',
    color:'white',
    fontSize:20,
    
  },
  saveText:{
    marginTop:20,
    fontSize:24,
    fontWeight:'bold',
    marginHorizontal:40
  }
})