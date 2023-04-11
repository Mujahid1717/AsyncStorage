import { StyleSheet, Text, TextInput, TouchableOpacity, View ,Alert} from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation} from '@react-navigation/native';

const Login = () => {
  
  const clearData = () =>{
    setEmail('');
    setPassword('');
  }
   
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigation = useNavigation();
  
  const saveEmailPass = async()=>{
    var reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    var testEmail = reg.test((email))
    if (email == '' || password == ''){
      Alert.alert('Error','Enter Email Address and Password')
      navigation.navigate('login')
      }
      else if (testEmail == true) {
        await AsyncStorage.setItem('EMAIL',email)
        await AsyncStorage.setItem('PASSWORD',password)
        navigation.navigate('contact')
        clearData();
      }else {
        alert('Enter Valid Email')
      }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      <TextInput placeholder='Enter Email'
        style = {styles.input}
        autoCapitalize ='none'
        value = {email}
        onChangeText={txt => setEmail(txt)}
      />

      <TextInput placeholder='Enter Password'
        style = {styles.input}
        value = {password}
        onChangeText={txt => setPassword(txt)}
        secureTextEntry = 'true'
      />
      <TouchableOpacity style={styles.btn} onPress={()=>{saveEmailPass()}}>
            <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
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
        fontSize:30,
        marginBottom:10
    },
    input:{
      height:55,
      width:"80%",
      borderColor:'black',
      borderRadius:10,
      borderWidth:1,
      paddingHorizontal:20,
      fontSize:20,
      marginTop:30

    },
    btn:{
      height:55,
      width:"80%",
      borderRadius:10,
      backgroundColor:'black',
      marginTop:20,
      justifyContent:'center',
      alignItems:'center'
    },
    btnText:{
      color:'white',
      fontSize:24,
      fontWeight:'bold'
    }
});
export default Login;