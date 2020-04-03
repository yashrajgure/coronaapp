import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';
export default function App() {

  const [info,setInfo] = useState({})

  const [country,setCountry]= useState('')
  
  const [newCountry,setNewCountry] = useState('USA')

  const buttonHandler = () => {
    setNewCountry(country)
  }

  useEffect( () => {
      axios
          .get(`https://corona.lmao.ninja/countries/${newCountry}`)
          .then(res => {
              console.log(res)
              setInfo(res.data)
          })
          .catch(err => {
              console.log(err)
          })
  }, [newCountry])

  return (
    <View style={styles.container}>
      <Text>Enter Country:</Text>
      <TextInput 
        placeholder= 'default: USA'
        style={styles.input}
        onChange= { val => setCountry(val)}/>
      <Button onPress={() => buttonHandler() } title='Check'/>
      <Text>The Cases are: { info.cases }</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    borderWidth: 1,
    borderColor: '#777',
    padding: 10,
    margin: 10,
    width: 200,
    textAlign: 'center',
}
});
