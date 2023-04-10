import { StyleSheet, Text, View, TextInput,TouchableOpacity,keyboardType } from 'react-native';
import React, { useState } from 'react';
import { useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let contacts = [];
const AddContact = () => {
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const navigation = useNavigation();
  

  const saveContact = async ()=>{
     let tempContact = [];
     contacts = [];
    let x = JSON.parse( await AsyncStorage.getItem('CONTACT'))
    tempContact = x;
    tempContact.map(item=>{
      contacts.push(item);
    });
    contacts.push({name: name , phone: phone});
    await AsyncStorage.setItem('CONTACT',JSON.stringify(contacts))
    navigation.goBack();

  }

  return (
    <View style ={styles.container}>
      <Text style={styles.headerText}>Add Contact</Text>
      <TextInput placeholder='Enter Name'
        style = {styles.input}
        value = {name}
        onChangeText={txt => setName(txt)}
      />

      <TextInput placeholder='Enter Number'
        style = {styles.input}
        keyboardType = 'name-phone-pad'
        value = {phone}
        onChangeText={txt => setPhone(txt)}
      />
      <TouchableOpacity style={styles.btn} onPress={()=>{saveContact()}}>
            <Text style={styles.btnText}>Save Contact</Text>
      </TouchableOpacity>
      
    </View>
  );
};
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
export default AddContact;