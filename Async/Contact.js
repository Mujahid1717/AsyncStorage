import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,useIsFocused } from '@react-navigation/native';

const Contact = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [contactList,setContactList] = useState('');
 
  useEffect(()=>{
    getData();
  },[isFocused]);

   const getData = async ()=>{
    const saveContacts = await AsyncStorage.getItem('CONTACT');
    setContactList((JSON.parse(saveContacts)));
   };

   const deleteContact = async (index)=>{
      const tempData = contactList;
      const selectedData = tempData.filter((item,ind)=>{
        return ind != index;
      });
      setContactList(selectedData);
      await AsyncStorage.setItem('CONTACT',JSON.stringify(selectedData))
    };
    
    const Logout = async () =>{
      await AsyncStorage.setItem('EMAIL',"")
      await AsyncStorage.setItem('PASSWORD',"")
      navigation.navigate('login')

    }

  return (
    <View style={styles.container}>
      <FlatList 
        data = {contactList}
        renderItem={({item,index})=>{
          return (
            <View style = {styles.listItem}>
                <Text style={styles.textStyle}>{item.name.toUpperCase()}</Text>
                <Text style={styles.phoneStyle}>{item.phone}</Text>
               
                <TouchableOpacity style={styles.deleteBtn} onPress={()=>{deleteContact(index)}}>
                  <Text style = {{color:'white',fontWeight:'bold'}}>Delete</Text>
                </TouchableOpacity>
            </View>
          )
        }}
      />
      <TouchableOpacity 
      style = {styles.btn}
      onPress={()=>{
        navigation.navigate('addContact')
      }}
      >
        <Text style={styles.btnText}>Add Contact</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      style = {styles.btnLog}
      onPress={()=>{
        Logout()
      }}
      >
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingVertical:50
  },
  btn:{
    height:55,
    width:"45%",
    borderRadius:10,
    backgroundColor:'black',
    marginTop:20,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    bottom:40,
    right:20
  },
  btnText:{
    color:'white',
    fontSize:20,
    fontWeight:'bold'
  },
  btnLog:{
    height:55,
    width:"30%",
    borderRadius:10,
    backgroundColor:'black',
    marginTop:20,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    bottom:40,
    left:20
  },
  btnText:{
    color:'white',
    fontSize:20,
    fontWeight:'bold'
  },
  listItem:{
    height:50,
    width:"90%",
    borderWidth:1,
    alignSelf:'center',
    borderRadius:10,
    marginTop:10,
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:20,
    justifyContent:'space-between',
    
  },
  textStyle:{
    
  },
  phoneStyle:{
    marginLeft:30
  },
  deleteBtn:{
    backgroundColor:'red',
    padding:10,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    marginRight:15,
  }
 
});
export default Contact;