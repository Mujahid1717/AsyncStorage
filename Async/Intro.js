import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Intro = () => {
    const navigation = useNavigation()
    
    useEffect(()=>{
        setTimeout(()=>{
            checkLogin();
        },3000)
    },[])
    
     const checkLogin = async()=>{
        const email = await AsyncStorage.getItem('EMAIL')
        const password = await AsyncStorage.getItem('PASSWORD')
            if(email !== null ){
              navigation.navigate('contact')
            }else{
              navigation.navigate('login')
            }
     }
  return (
    <View style = {styles.container}>
      <Text style = {styles.headerText}>My Contact App</Text>
    </View>
  )
}

const styles = StyleSheet.create({
        container:{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        },
        headerText:{
            fontFamily:'CartoonQueen',
            fontWeight:'bold',
            fontSize:24,
            color:'green'
        }
});
export default Intro;